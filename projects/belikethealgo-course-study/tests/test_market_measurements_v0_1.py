import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "detector"))

from market_measurements_v0_1 import (
    Candle,
    atr_series,
    fvg_at,
    structure_break,
    liquidity_sweep,
    leg_metrics,
    equal_level_cluster,
    target_room_R,
)


class MarketMeasurementsV01Tests(unittest.TestCase):
    def test_bullish_fvg_geometry(self):
        c = [
            Candle(1, 1.00, 1.02, 0.99, 1.01),
            Candle(2, 1.01, 1.08, 1.00, 1.07),
            Candle(3, 1.07, 1.10, 1.04, 1.09),
        ]
        f = fvg_at(c, 2, atr=0.05)
        self.assertIsNotNone(f)
        self.assertEqual(f["side"], "bullish")
        self.assertAlmostEqual(f["zone_low"], 1.02)
        self.assertAlmostEqual(f["zone_high"], 1.04)

    def test_wick_only_break_is_not_body_break(self):
        c = Candle(1, 1.00, 1.11, 0.98, 1.08)
        b = structure_break(c, 1.10, "bullish", atr=0.05)
        self.assertTrue(b["extreme_crosses_reference"])
        self.assertFalse(b["close_crosses_reference"])
        self.assertTrue(b["wick_only_violation"])
        self.assertFalse(b["body_break_candidate"])

    def test_body_break_candidate(self):
        c = Candle(1, 1.00, 1.15, 0.99, 1.13)
        b = structure_break(c, 1.10, "bullish", atr=0.05)
        self.assertTrue(b["close_crosses_reference"])
        self.assertTrue(b["body_break_candidate"])
        self.assertFalse(b["wick_only_violation"])
        self.assertAlmostEqual(b["close_penetration_atr"], 0.6)

    def test_liquidity_sweep_and_return_inside(self):
        c = Candle(1, 1.08, 1.12, 1.06, 1.09)
        s = liquidity_sweep(c, 1.10, "high", atr=0.05)
        self.assertTrue(s["taken"])
        self.assertTrue(s["return_inside"])
        self.assertAlmostEqual(s["penetration_atr"], 0.4)

    def test_equal_level_is_unresolved_without_threshold(self):
        r = equal_level_cluster([1.1000, 1.1002, 1.1001], atr_ref=0.005, tolerance_atr=None)
        self.assertEqual(r["status"], "UNRESOLVED")
        self.assertIsNone(r["cluster"])

    def test_equal_level_can_be_decided_after_threshold_is_frozen(self):
        r = equal_level_cluster([1.1000, 1.1002, 1.1001], atr_ref=0.005, tolerance_atr=0.05)
        self.assertEqual(r["status"], "PASS")
        self.assertTrue(r["cluster"])

    def test_leg_metrics_do_not_label_validity(self):
        c = [
            Candle(1, 1.00, 1.02, 0.99, 1.015),
            Candle(2, 1.015, 1.04, 1.01, 1.035),
            Candle(3, 1.035, 1.06, 1.03, 1.055),
        ]
        m = leg_metrics(c, 0, 2, atr_ref=0.02, direction="bullish")
        self.assertGreater(m["net_move_atr"], 0)
        self.assertGreater(m["directional_fraction"], 0)
        self.assertIn("efficiency", m)
        self.assertNotIn("valid", m)

    def test_target_room_R(self):
        self.assertAlmostEqual(target_room_R(1.1000, 1.0950, 1.1150, "long"), 3.0)
        self.assertAlmostEqual(target_room_R(1.1000, 1.1050, 1.0850, "short"), 3.0)


if __name__ == "__main__":
    unittest.main()
