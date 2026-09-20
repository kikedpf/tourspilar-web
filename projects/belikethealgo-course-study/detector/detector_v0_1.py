from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional


class Status(str, Enum):
    PASS = "PASS"
    FAIL = "FAIL"
    UNRESOLVED = "UNRESOLVED"


@dataclass
class LayerResult:
    status: Status
    reason_codes: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    unresolved: List[str] = field(default_factory=list)


@dataclass
class DetectorResult:
    detector_version: str
    context: LayerResult
    liquidity: LayerResult
    activation: LayerResult
    entry: LayerResult
    setup_status: Status
    state_reached: str
    reason_codes: List[str]
    warnings: List[str]
    unresolved: List[str]


def _merge_status(results: List[LayerResult]) -> Status:
    if any(r.status == Status.FAIL for r in results):
        return Status.FAIL
    if any(r.status == Status.UNRESOLVED for r in results):
        return Status.UNRESOLVED
    return Status.PASS


def _required_bool(
    value: Any,
    *,
    false_code: str,
    unresolved_name: str,
    reasons: List[str],
    unresolved: List[str],
) -> Optional[bool]:
    if value is True:
        return True
    if value is False:
        reasons.append(false_code)
        return False
    unresolved.append(unresolved_name)
    return None


def _layer(reasons: List[str], warnings: List[str], unresolved: List[str]) -> LayerResult:
    if reasons:
        status = Status.FAIL
    elif unresolved:
        status = Status.UNRESOLVED
    else:
        status = Status.PASS
    return LayerResult(status, reasons, warnings, unresolved)


def _check_known_times(x: Dict[str, Any], decision_time: Any) -> List[str]:
    if decision_time is None:
        return []
    violations = []
    for key in (
        "required_liquidity_take_known_time",
        "reaction_known_time",
        "impulse_known_time",
        "structure_break_known_time",
        "candle_pattern_known_time",
        "entry_imbalance_known_time",
    ):
        t = x.get(key)
        if t is not None and t > decision_time:
            violations.append(key)
    return violations


def detect(features: Dict[str, Any], params: Optional[Dict[str, Any]] = None) -> DetectorResult:
    """Benjamin detector v0.1.

    Inputs are pre-measured event/schema fields. The detector deliberately does
    not read L3 outcome fields. Numeric thresholds that are not frozen remain
    UNRESOLVED rather than guessed.
    """
    p = params or {}
    provisional = p.get("provisional_rules", {})
    min_confirmations = provisional.get("normal_confirmation_min_count", 2)

    # ---------- L0 CONTEXT ----------
    cr: List[str] = []
    cw: List[str] = []
    cu: List[str] = []

    _required_bool(features.get("session_eligible"), false_code="CTX_SESSION_BLOCKED",
                   unresolved_name="session_eligible", reasons=cr, unresolved=cu)
    _required_bool(features.get("holiday_eligible"), false_code="CTX_HOLIDAY_BLOCKED",
                   unresolved_name="holiday_eligible", reasons=cr, unresolved=cu)
    _required_bool(features.get("news_eligible"), false_code="CTX_NEWS_BLOCKED",
                   unresolved_name="news_eligible", reasons=cr, unresolved=cu)

    if features.get("htf_location_required") is True:
        _required_bool(features.get("htf_poi_present"), false_code="CTX_REQUIRED_HTF_LOCATION_MISSING",
                       unresolved_name="htf_poi_present", reasons=cr, unresolved=cu)

    if features.get("target_room_sufficient") is False:
        cr.append("CTX_TARGET_ROOM_INSUFFICIENT")
    elif features.get("target_room_sufficient") is None:
        cu.append("target_room_sufficient")

    context_liq_present = features.get("context_liquidity_present")
    if context_liq_present is False:
        cr.append("LIQ_REQUIRED_MISSING")
    elif context_liq_present is None:
        cu.append("context_liquidity_present")

    liq_tf = features.get("context_liquidity_tf_minutes")
    named = bool(features.get("context_liquidity_named_reference"))
    htf_backed = bool(features.get("higher_tf_context_liquidity_present"))
    pref_min_tf = provisional.get("preferred_context_liquidity_min_tf_minutes", 15)
    if liq_tf is not None and liq_tf < pref_min_tf and not named and not htf_backed:
        cw.append("CTX_MICRO_LIQUIDITY_ONLY")

    context = _layer(cr, cw, cu)

    # ---------- LIQUIDITY ----------
    lr: List[str] = []
    lw: List[str] = []
    lu: List[str] = []

    taken = _required_bool(features.get("required_liquidity_taken"),
                           false_code="LIQ_REQUIRED_NOT_TAKEN",
                           unresolved_name="required_liquidity_taken",
                           reasons=lr, unresolved=lu)

    if taken is True and features.get("liquidity_event_present") is False:
        lr.append("LIQ_EVENT_INCONSISTENT")
    elif features.get("liquidity_event_present") is None:
        lu.append("liquidity_event_present")

    liquidity = _layer(lr, lw, lu)

    # ---------- L1 ACTIVATION ----------
    ar: List[str] = []
    aw: List[str] = []
    au: List[str] = []

    impulse = features.get("impulse_confirmed")
    if impulse is False:
        ar.append("IMPULSE_MISSING")
    elif impulse is None:
        au.append("impulse_confirmed")

    impulse_imb = features.get("impulse_created_imbalance")
    if impulse_imb is False:
        ar.append("IMPULSE_NO_IMBALANCE")
    elif impulse_imb is None:
        au.append("impulse_created_imbalance")

    entry_imb = features.get("entry_imbalance_created")
    if entry_imb is False:
        ar.append("IMBALANCE_MISSING")
    elif entry_imb is None:
        au.append("entry_imbalance_created")

    impulse_plus_imbalance = (impulse is True and impulse_imb is True and entry_imb is True)

    structure_confirmed = features.get("structure_change_confirmed")
    structure_by_close = features.get("structure_break_by_close")
    body_structure = structure_confirmed is True and structure_by_close is True

    if structure_confirmed is True and structure_by_close is False:
        aw.append("BOS_WICK_ONLY_NOT_CONFIRMATION")

    candle = features.get("candle_formation_confirmed")
    if candle is None:
        au.append("candle_formation_confirmed")

    confirmation_count = int(impulse_plus_imbalance) + int(body_structure) + int(candle is True)
    if impulse_plus_imbalance and confirmation_count < min_confirmations:
        ar.append("CONFIRMATION_INSUFFICIENT")

    if features.get("poi_type") == "orderblock":
        inducement = features.get("inducement_exists_before_retest")
        if inducement is False:
            ar.append("ORDERBLOCK_NO_INDUCEMENT")
        elif inducement is None:
            au.append("inducement_exists_before_retest")

    decision_time = features.get("decision_time")
    violations = _check_known_times(features, decision_time)
    if violations:
        ar.append("LOOKAHEAD_VIOLATION")
        aw.extend([f"KNOWN_AFTER_DECISION:{k}" for k in violations])

    # No numeric threshold is guessed. If a concept has no semantic label yet,
    # its future numeric thresholds remain calibration parameters outside v0.1.
    activation = _layer(ar, aw, au)

    # ---------- ENTRY ----------
    er: List[str] = []
    ew: List[str] = []
    eu: List[str] = []

    _required_bool(features.get("entry_zone_defined"), false_code="ENTRY_ZONE_UNDEFINED",
                   unresolved_name="entry_zone_defined", reasons=er, unresolved=eu)
    _required_bool(features.get("retracement_into_entry_zone"), false_code="ENTRY_NO_RETRACE",
                   unresolved_name="retracement_into_entry_zone", reasons=er, unresolved=eu)
    _required_bool(features.get("entry_trigger_confirmed"), false_code="ENTRY_TRIGGER_MISSING",
                   unresolved_name="entry_trigger_confirmed", reasons=er, unresolved=eu)

    if features.get("chase_attempted") is True:
        er.append("ENTRY_CHASE")
    elif features.get("chase_attempted") is None:
        eu.append("chase_attempted")

    timing_at_entry = features.get("timing_eligible_at_entry")
    if timing_at_entry is False:
        er.append("ENTRY_TIME_INVALID")
    elif timing_at_entry is None:
        eu.append("timing_eligible_at_entry")

    entry = _layer(er, ew, eu)

    results = [context, liquidity, activation, entry]
    setup_status = _merge_status(results)

    if context.status != Status.PASS:
        state = "S0_CONTEXT"
    elif liquidity.status != Status.PASS:
        state = "S1_S2_LIQUIDITY"
    elif activation.status != Status.PASS:
        state = "S3_S6_ACTIVATION"
    elif entry.status != Status.PASS:
        state = "S7_S8_ENTRY"
    else:
        state = "S8_ENTRY_ACTIVATED"

    reasons = [x for r in results for x in r.reason_codes]
    warnings = [x for r in results for x in r.warnings]
    unresolved = [x for r in results for x in r.unresolved]

    return DetectorResult(
        detector_version=p.get("detector_version", "0.1.0"),
        context=context,
        liquidity=liquidity,
        activation=activation,
        entry=entry,
        setup_status=setup_status,
        state_reached=state,
        reason_codes=reasons,
        warnings=warnings,
        unresolved=unresolved,
    )
