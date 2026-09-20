from __future__ import annotations

from dataclasses import dataclass
from math import isfinite
from statistics import median
from typing import Iterable, List, Optional, Sequence, Dict, Any


@dataclass(frozen=True)
class Candle:
    ts: object
    open: float
    high: float
    low: float
    close: float

    @property
    def range(self) -> float:
        return max(0.0, self.high - self.low)

    @property
    def body(self) -> float:
        return abs(self.close - self.open)

    @property
    def body_ratio(self) -> float:
        return self.body / self.range if self.range > 0 else 0.0

    @property
    def upper_wick(self) -> float:
        return self.high - max(self.open, self.close)

    @property
    def lower_wick(self) -> float:
        return min(self.open, self.close) - self.low

    @property
    def close_location(self) -> float:
        return (self.close - self.low) / self.range if self.range > 0 else 0.5


def true_range(curr: Candle, prev_close: Optional[float]) -> float:
    if prev_close is None:
        return curr.range
    return max(
        curr.high - curr.low,
        abs(curr.high - prev_close),
        abs(curr.low - prev_close),
    )


def atr_series(candles: Sequence[Candle], period: int = 14) -> List[Optional[float]]:
    """Wilder ATR. Values are known only after each candle closes."""
    if period <= 0:
        raise ValueError("period must be > 0")
    out: List[Optional[float]] = [None] * len(candles)
    trs = [true_range(c, candles[i - 1].close if i else None) for i, c in enumerate(candles)]
    if len(candles) < period:
        return out
    atr = sum(trs[:period]) / period
    out[period - 1] = atr
    for i in range(period, len(candles)):
        atr = ((period - 1) * atr + trs[i]) / period
        out[i] = atr
    return out


def candle_geometry(c: Candle, atr: Optional[float] = None) -> Dict[str, Any]:
    r = c.range
    return {
        "range": r,
        "body": c.body,
        "body_ratio": c.body_ratio,
        "upper_wick": c.upper_wick,
        "lower_wick": c.lower_wick,
        "upper_wick_ratio": c.upper_wick / r if r else 0.0,
        "lower_wick_ratio": c.lower_wick / r if r else 0.0,
        "close_location": c.close_location,
        "range_atr": r / atr if atr and atr > 0 else None,
        "body_atr": c.body / atr if atr and atr > 0 else None,
        "known_time": c.ts,
    }


def fvg_at(candles: Sequence[Candle], i: int, atr: Optional[float] = None) -> Optional[Dict[str, Any]]:
    """Three-candle imbalance/FVG ending at i. Known after candle i closes."""
    if i < 2 or i >= len(candles):
        return None
    c1, c3 = candles[i - 2], candles[i]
    if c1.high < c3.low:
        lo, hi, side = c1.high, c3.low, "bullish"
    elif c1.low > c3.high:
        lo, hi, side = c3.high, c1.low, "bearish"
    else:
        return None
    gap = hi - lo
    return {
        "side": side,
        "zone_low": lo,
        "zone_high": hi,
        "gap_size": gap,
        "gap_size_atr": gap / atr if atr and atr > 0 else None,
        "created_index": i,
        "known_time": c3.ts,
    }


def fvg_touch(c: Candle, zone_low: float, zone_high: float) -> bool:
    return c.high >= zone_low and c.low <= zone_high


def structure_break(
    candle: Candle,
    reference_price: float,
    direction: str,
    atr: Optional[float] = None,
) -> Dict[str, Any]:
    if direction not in {"bullish", "bearish"}:
        raise ValueError("direction must be bullish or bearish")
    if direction == "bullish":
        extreme_crosses = candle.high > reference_price
        close_crosses = candle.close > reference_price
        extreme_pen = max(0.0, candle.high - reference_price)
        close_pen = max(0.0, candle.close - reference_price)
    else:
        extreme_crosses = candle.low < reference_price
        close_crosses = candle.close < reference_price
        extreme_pen = max(0.0, reference_price - candle.low)
        close_pen = max(0.0, reference_price - candle.close)
    return {
        "direction": direction,
        "reference_price": reference_price,
        "extreme_crosses_reference": extreme_crosses,
        "close_crosses_reference": close_crosses,
        "wick_only_violation": extreme_crosses and not close_crosses,
        "body_break_candidate": close_crosses,
        "penetration": extreme_pen,
        "close_penetration": close_pen,
        "penetration_atr": extreme_pen / atr if atr and atr > 0 else None,
        "close_penetration_atr": close_pen / atr if atr and atr > 0 else None,
        "break_body_ratio": candle.body_ratio,
        "break_close_location": candle.close_location,
        "known_time": candle.ts,
    }


def liquidity_sweep(
    candle: Candle,
    level: float,
    liquidity_side: str,
    atr: Optional[float] = None,
) -> Dict[str, Any]:
    """liquidity_side is 'high' for buy-side liquidity or 'low' for sell-side."""
    if liquidity_side == "high":
        taken = candle.high > level
        penetration = max(0.0, candle.high - level)
        return_inside = candle.close <= level
    elif liquidity_side == "low":
        taken = candle.low < level
        penetration = max(0.0, level - candle.low)
        return_inside = candle.close >= level
    else:
        raise ValueError("liquidity_side must be high or low")
    return {
        "liquidity_side": liquidity_side,
        "level": level,
        "taken": taken,
        "penetration": penetration,
        "penetration_atr": penetration / atr if atr and atr > 0 else None,
        "return_inside": return_inside if taken else False,
        "known_time": candle.ts,
    }


def _pair_overlap(a: Candle, b: Candle) -> float:
    overlap = max(0.0, min(a.high, b.high) - max(a.low, b.low))
    union = max(a.high, b.high) - min(a.low, b.low)
    return overlap / union if union > 0 else 0.0


def leg_metrics(
    candles: Sequence[Candle],
    start: int,
    end: int,
    atr_ref: Optional[float],
    direction: Optional[str] = None,
    previous_ranges: Optional[Sequence[float]] = None,
) -> Dict[str, Any]:
    """Measure an already-defined impulse/displacement leg. Does not label it valid."""
    if not (0 <= start <= end < len(candles)):
        raise ValueError("invalid leg indices")
    leg = list(candles[start : end + 1])
    if direction is None:
        direction = "bullish" if leg[-1].close >= leg[0].open else "bearish"
    net = abs(leg[-1].close - leg[0].open)
    path = sum(abs(leg[i].close - (leg[i - 1].close if i else leg[0].open)) for i in range(len(leg)))
    ranges = [c.range for c in leg]
    bodies = [c.body for c in leg]
    directional = sum(
        1 for c in leg
        if (direction == "bullish" and c.close > c.open)
        or (direction == "bearish" and c.close < c.open)
    )
    overlaps = [_pair_overlap(leg[i - 1], leg[i]) for i in range(1, len(leg))]
    total_range = sum(ranges)
    prev_med = median(previous_ranges) if previous_ranges else None
    return {
        "direction": direction,
        "candle_count": len(leg),
        "net_move": net,
        "net_move_atr": net / atr_ref if atr_ref and atr_ref > 0 else None,
        "max_candle_range_atr": max(ranges) / atr_ref if atr_ref and atr_ref > 0 else None,
        "median_body_ratio": median([c.body_ratio for c in leg]) if leg else None,
        "directional_fraction": directional / len(leg) if leg else None,
        "overlap_ratio": sum(overlaps) / len(overlaps) if overlaps else 0.0,
        "efficiency": net / path if path > 0 else 0.0,
        "body_dominance": sum(bodies) / total_range if total_range > 0 else 0.0,
        "range_expansion": median(ranges) / prev_med if prev_med and prev_med > 0 else None,
        "start_time": leg[0].ts,
        "known_time": leg[-1].ts,
    }


def equal_level_cluster(
    levels: Sequence[float],
    atr_ref: Optional[float],
    tolerance_atr: Optional[float],
) -> Dict[str, Any]:
    """Measure equal-high/low dispersion. If threshold is not frozen, state is unresolved."""
    if not levels:
        return {"cluster": False, "status": "FAIL", "dispersion_atr": None}
    center = sum(levels) / len(levels)
    dispersion = max(abs(x - center) for x in levels)
    dispersion_atr = dispersion / atr_ref if atr_ref and atr_ref > 0 else None
    if tolerance_atr is None or dispersion_atr is None:
        return {
            "cluster": None,
            "status": "UNRESOLVED",
            "center": center,
            "dispersion_atr": dispersion_atr,
        }
    ok = dispersion_atr <= tolerance_atr
    return {
        "cluster": ok,
        "status": "PASS" if ok else "FAIL",
        "center": center,
        "dispersion_atr": dispersion_atr,
    }


def confirmed_pivot(
    candles: Sequence[Candle],
    i: int,
    left: int,
    right: int,
    side: str,
) -> bool:
    """Confirmed pivot; known only after i+right closes, preventing hidden look-ahead."""
    if left < 1 or right < 1 or i - left < 0 or i + right >= len(candles):
        return False
    if side == "high":
        p = candles[i].high
        return all(p > candles[j].high for j in range(i-left, i)) and all(p >= candles[j].high for j in range(i+1, i+right+1))
    if side == "low":
        p = candles[i].low
        return all(p < candles[j].low for j in range(i-left, i)) and all(p <= candles[j].low for j in range(i+1, i+right+1))
    raise ValueError("side must be high or low")


def target_room_R(entry: float, stop: float, target: float, side: str) -> Optional[float]:
    if side == "long":
        risk = entry - stop
        reward = target - entry
    elif side == "short":
        risk = stop - entry
        reward = entry - target
    else:
        raise ValueError("side must be long or short")
    if risk <= 0:
        return None
    return reward / risk
