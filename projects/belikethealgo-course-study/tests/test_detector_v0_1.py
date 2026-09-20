import json
import unittest
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "detector"))

from detector_v0_1 import Status, detect

PARAMS = json.loads((ROOT / "detector" / "parameters_v0_1.json").read_text())


def valid_case():
    return {
        "session_eligible": True,
        "holiday_eligible": True,
        "news_eligible": True,
        "htf_location_required": True,
        "htf_poi_present": True,
        "target_room_sufficient": True,
        "context_liquidity_present": True,
        "context_liquidity_tf_minutes": 60,
        "higher_tf_context_liquidity_present": True,
        "required_liquidity_taken": True,
        "liquidity_event_present": True,
        "impulse_confirmed": True,
        "impulse_created_imbalance": True,
        "entry_imbalance_created": True,
        "structure_change_confirmed": True,
        "structure_break_by_close": True,
        "candle_formation_confirmed": False,
        "entry_zone_defined": True,
        "retracement_into_entry_zone": True,
        "entry_trigger_confirmed": True,
        "chase_attempted": False,
        "timing_eligible_at_entry": True,
        "decision_time": 100,
        "required_liquidity_take_known_time": 80,
        "impulse_known_time": 90,
        "structure_break_known_time": 92,
        "entry_imbalance_known_time": 93,
    }


class DetectorV01Tests(unittest.TestCase):
    def test_normal_valid_setup_passes(self):
        r = detect(valid_case(), PARAMS)
        self.assertEqual(r.setup_status, Status.PASS)
        self.assertEqual(r.state_reached, "S8_ENTRY_ACTIVATED")

    def test_news_block_fails_context(self):
        x = valid_case(); x["news_eligible"] = False
        r = detect(x, PARAMS)
        self.assertEqual(r.setup_status, Status.FAIL)
        self.assertIn("CTX_NEWS_BLOCKED", r.reason_codes)

    def test_wick_only_does_not_count_as_structure(self):
        x = valid_case()
        x["structure_break_by_close"] = False
        x["candle_formation_confirmed"] = False
        r = detect(x, PARAMS)
        self.assertEqual(r.setup_status, Status.FAIL)
        self.assertIn("BOS_WICK_ONLY_NOT_CONFIRMATION", r.warnings)
        self.assertIn("CONFIRMATION_INSUFFICIENT", r.reason_codes)

    def test_candle_plus_impulse_can_pass_without_structure_confirmation(self):
        x = valid_case()
        x["structure_change_confirmed"] = False
        x["structure_break_by_close"] = False
        x["candle_formation_confirmed"] = True
        r = detect(x, PARAMS)
        self.assertEqual(r.setup_status, Status.PASS)

    def test_uninduced_orderblock_fails(self):
        x = valid_case()
        x["poi_type"] = "orderblock"
        x["inducement_exists_before_retest"] = False
        r = detect(x, PARAMS)
        self.assertEqual(r.setup_status, Status.FAIL)
        self.assertIn("ORDERBLOCK_NO_INDUCEMENT", r.reason_codes)

    def test_chasing_missed_entry_fails(self):
        x = valid_case(); x["chase_attempted"] = True
        r = detect(x, PARAMS)
        self.assertEqual(r.setup_status, Status.FAIL)
        self.assertIn("ENTRY_CHASE", r.reason_codes)

    def test_missing_impulse_label_is_unresolved_not_guessed(self):
        x = valid_case(); x["impulse_confirmed"] = None
        r = detect(x, PARAMS)
        self.assertEqual(r.setup_status, Status.UNRESOLVED)
        self.assertIn("impulse_confirmed", r.unresolved)

    def test_lookahead_is_rejected(self):
        x = valid_case(); x["impulse_known_time"] = 110
        r = detect(x, PARAMS)
        self.assertEqual(r.setup_status, Status.FAIL)
        self.assertIn("LOOKAHEAD_VIOLATION", r.reason_codes)

    def test_micro_context_liquidity_is_warning_not_hard_veto(self):
        x = valid_case()
        x["context_liquidity_tf_minutes"] = 5
        x["higher_tf_context_liquidity_present"] = False
        x["context_liquidity_named_reference"] = False
        r = detect(x, PARAMS)
        self.assertEqual(r.setup_status, Status.PASS)
        self.assertIn("CTX_MICRO_LIQUIDITY_ONLY", r.warnings)


if __name__ == "__main__":
    unittest.main()
