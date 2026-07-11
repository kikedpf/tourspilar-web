(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PolancoEngine = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const DEFAULTS = Object.freeze({
    salePrice: 270000000,
    purchasePrice: 150000000,
    listedPrice: 170000000,
    area: 55,
    renovationPerSqm: 1100000,
    targetMargin: 0.15,
    durationDays: 60,
    commissionPct: 0.03,
    vatPct: 0.19,
    includeVat: true,
    saleCostsPct: 0.005,
    purchaseCostsPct: 0.018,
    fixedCosts: 2000000,
    contingency: 3000000,
    manualInterest: 0,
    incomeTaxPct: 0.35,
    icaPct: 0.01,
    fireSurchargePct: 0,
    otherCosts: 0,
    marketGray: 170000000,
    financePct: 0.70,
    annualRate: 0.16,
    bankFees: 0,
    interestDeductible: true
  });

  const n = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const pos = value => Math.max(0, n(value));
  const div = (a, b) => b ? a / b : 0;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function percentile(sortedValues, p) {
    if (!sortedValues.length) return 0;
    if (sortedValues.length === 1) return sortedValues[0];
    const index = (sortedValues.length - 1) * p;
    const low = Math.floor(index);
    const high = Math.ceil(index);
    if (low === high) return sortedValues[low];
    return sortedValues[low] + (sortedValues[high] - sortedValues[low]) * (index - low);
  }

  function normalizeOperation(raw = {}) {
    return {
      ...DEFAULTS,
      ...raw,
      salePrice: pos(raw.salePrice ?? DEFAULTS.salePrice),
      purchasePrice: pos(raw.purchasePrice ?? DEFAULTS.purchasePrice),
      listedPrice: pos(raw.listedPrice ?? DEFAULTS.listedPrice),
      area: pos(raw.area ?? DEFAULTS.area),
      renovationPerSqm: pos(raw.renovationPerSqm ?? DEFAULTS.renovationPerSqm),
      targetMargin: pos(raw.targetMargin ?? DEFAULTS.targetMargin),
      durationDays: Math.max(1, pos(raw.durationDays ?? DEFAULTS.durationDays)),
      commissionPct: pos(raw.commissionPct ?? DEFAULTS.commissionPct),
      vatPct: pos(raw.vatPct ?? DEFAULTS.vatPct),
      includeVat: raw.includeVat !== false,
      saleCostsPct: pos(raw.saleCostsPct ?? DEFAULTS.saleCostsPct),
      purchaseCostsPct: pos(raw.purchaseCostsPct ?? DEFAULTS.purchaseCostsPct),
      fixedCosts: pos(raw.fixedCosts ?? DEFAULTS.fixedCosts),
      contingency: pos(raw.contingency ?? DEFAULTS.contingency),
      manualInterest: pos(raw.manualInterest ?? DEFAULTS.manualInterest),
      incomeTaxPct: pos(raw.incomeTaxPct ?? DEFAULTS.incomeTaxPct),
      icaPct: pos(raw.icaPct ?? DEFAULTS.icaPct),
      fireSurchargePct: pos(raw.fireSurchargePct ?? DEFAULTS.fireSurchargePct),
      otherCosts: pos(raw.otherCosts ?? DEFAULTS.otherCosts),
      marketGray: pos(raw.marketGray ?? DEFAULTS.marketGray),
      financePct: pos(raw.financePct ?? DEFAULTS.financePct),
      annualRate: pos(raw.annualRate ?? DEFAULTS.annualRate),
      bankFees: pos(raw.bankFees ?? DEFAULTS.bankFees),
      interestDeductible: raw.interestDeductible !== false,
      comparables: Array.isArray(raw.comparables) ? raw.comparables : [],
      renovationItems: Array.isArray(raw.renovationItems) ? raw.renovationItems : []
    };
  }

  function renovationSummary(operation) {
    const items = Array.isArray(operation.renovationItems) ? operation.renovationItems : [];
    const valid = items.filter(item => pos(item.qty) > 0 && pos(item.unitCost) >= 0);
    const estimated = valid.reduce((sum, item) => sum + pos(item.qty) * pos(item.unitCost), 0);
    const actual = valid.reduce((sum, item) => {
      const value = item.actualCost === '' || item.actualCost == null ? pos(item.qty) * pos(item.unitCost) : pos(item.actualCost);
      return sum + value;
    }, 0);
    const fallback = pos(operation.area) * pos(operation.renovationPerSqm);
    return {
      estimated: estimated || fallback,
      actual: actual || estimated || fallback,
      usesDetailedBudget: valid.length > 0,
      variance: actual && estimated ? actual - estimated : 0,
      variancePct: estimated ? (actual - estimated) / estimated : 0,
      itemCount: valid.length
    };
  }

  function comparableSummary(operation) {
    const area = pos(operation.area);
    const rows = (operation.comparables || [])
      .filter(c => !c.excluded && pos(c.price) > 0 && pos(c.area) > 0)
      .map(c => ({ ...c, pricePerSqm: pos(c.price) / pos(c.area) }));
    const values = rows.map(r => r.pricePerSqm).sort((a, b) => a - b);
    if (!values.length) {
      return {
        count: 0, mean: 0, median: 0, min: 0, max: 0, p25: 0, p75: 0,
        dispersion: 1, confidence: 0, confidenceLabel: 'Sin evidencia',
        conservativeSale: 0, probableSale: 0, aggressiveSale: 0, rows
      };
    }
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
    const std = Math.sqrt(variance);
    const dispersion = mean ? std / mean : 1;
    const countScore = clamp(values.length / 8, 0, 1) * 55;
    const dispersionScore = clamp(1 - dispersion / 0.25, 0, 1) * 35;
    const recencyScore = rows.some(r => r.date) ? 10 : 4;
    const confidence = Math.round(countScore + dispersionScore + recencyScore);
    const confidenceLabel = confidence >= 80 ? 'Alta' : confidence >= 55 ? 'Media' : confidence >= 30 ? 'Baja' : 'Muy baja';
    const median = percentile(values, 0.5);
    const p25 = percentile(values, 0.25);
    const p75 = percentile(values, 0.75);
    return {
      count: values.length,
      mean,
      median,
      min: values[0],
      max: values[values.length - 1],
      p25,
      p75,
      dispersion,
      confidence,
      confidenceLabel,
      conservativeSale: p25 * area,
      probableSale: median * area,
      aggressiveSale: p75 * area,
      rows
    };
  }

  function calculate(raw = {}) {
    const o = normalizeOperation(raw);
    const renovation = renovationSummary(o);
    const comps = comparableSummary(o);
    const renovationTotal = renovation.actual;
    const commissionTotal = o.salePrice * o.commissionPct * (1 + (o.includeVat ? o.vatPct : 0));
    const saleCosts = o.salePrice * o.saleCostsPct;
    const ica = o.salePrice * o.icaPct;
    const fireSurcharge = ica * o.fireSurchargePct;
    const purchaseCosts = o.purchasePrice * o.purchaseCostsPct;

    const cashCost = o.purchasePrice + purchaseCosts + renovationTotal + commissionTotal + saleCosts + o.fixedCosts + o.contingency + o.manualInterest + o.otherCosts;
    const totalEconomicCost = cashCost + ica + fireSurcharge;
    const grossProfitBeforeTax = o.salePrice - totalEconomicCost;
    const incomeTax = Math.max(0, grossProfitBeforeTax) * o.incomeTaxPct;
    const netProfit = grossProfitBeforeTax - incomeTax;
    const grossMargin = div(grossProfitBeforeTax, o.salePrice);
    const netMargin = div(netProfit, o.salePrice);
    const roi = div(netProfit, cashCost);
    const annualizedRoi = roi * 365 / o.durationDays;
    const targetGrossProfit = o.salePrice * o.targetMargin;

    const maxPurchaseNumerator = o.salePrice - renovationTotal - commissionTotal - saleCosts - ica - fireSurcharge - o.fixedCosts - o.contingency - o.otherCosts - targetGrossProfit;
    const maxPurchase = Math.max(0, div(maxPurchaseNumerator, 1 + o.purchaseCostsPct));
    const roomVsMax = maxPurchase - o.purchasePrice;
    const decision = grossMargin >= o.targetMargin ? 'PASA' : 'NO PASA';

    const impliedPsm = div(o.salePrice, o.area);
    const compDiscount = comps.probableSale ? 1 - o.purchasePrice / comps.probableSale : 0;
    const grayDiscount = o.marketGray ? 1 - o.purchasePrice / o.marketGray : 0;

    const scoreParts = scoreOperation({ operation: o, grossMargin, netMargin, roi, roomVsMax, renovation, comps, decision, compDiscount, grayDiscount });
    const stress = stressTests(o);
    const risks = riskList({ operation: o, renovation, comps, grossMargin, netMargin, roi, roomVsMax, stress, decision });

    return {
      operation: o,
      renovation,
      comparables: comps,
      breakdown: {
        purchasePrice: o.purchasePrice,
        purchaseCosts,
        renovationTotal,
        commissionTotal,
        saleCosts,
        fixedCosts: o.fixedCosts,
        contingency: o.contingency,
        manualInterest: o.manualInterest,
        otherCosts: o.otherCosts,
        ica,
        fireSurcharge,
        cashCost,
        totalEconomicCost
      },
      actual: {
        grossProfitBeforeTax,
        incomeTax,
        netProfit,
        grossMargin,
        netMargin,
        roi,
        annualizedRoi,
        impliedPsm,
        decision,
        maxPurchase,
        roomVsMax,
        compDiscount,
        grayDiscount
      },
      score: scoreParts,
      stress,
      risks
    };
  }

  function scoreOperation(ctx) {
    const marginScore = clamp(ctx.netMargin / 0.12, 0, 1) * 28;
    const roiScore = clamp(ctx.roi / 0.18, 0, 1) * 22;
    const priceScore = clamp(ctx.roomVsMax / Math.max(ctx.operation.purchasePrice * 0.08, 1) + 0.5, 0, 1) * 18;
    const compScore = ctx.comps.confidence / 100 * 18;
    const renovationScore = clamp(1 - ctx.renovation.actual / Math.max(ctx.operation.salePrice * 0.35, 1), 0, 1) * 8;
    const timeScore = clamp(1 - (ctx.operation.durationDays - 90) / 270, 0, 1) * 6;
    const total = Math.round(clamp(marginScore + roiScore + priceScore + compScore + renovationScore + timeScore, 0, 100));
    const label = total >= 80 ? 'Excelente' : total >= 65 ? 'Interesante' : total >= 50 ? 'Revisar' : total >= 35 ? 'Débil' : 'Descartar';
    return { total, label, marginScore, roiScore, priceScore, compScore, renovationScore, timeScore };
  }

  function stressTests(raw) {
    const base = normalizeOperation(raw);
    const scenarios = [
      { key: 'saleMinus5', label: 'Venta -5%', patch: { salePrice: base.salePrice * 0.95 } },
      { key: 'saleMinus10', label: 'Venta -10%', patch: { salePrice: base.salePrice * 0.90 } },
      { key: 'renovationPlus10', label: 'Reforma +10%', patch: { renovationPerSqm: base.renovationPerSqm * 1.10, renovationItems: [] } },
      { key: 'renovationPlus20', label: 'Reforma +20%', patch: { renovationPerSqm: base.renovationPerSqm * 1.20, renovationItems: [] } }
    ];
    const out = {};
    for (const scenario of scenarios) {
      const op = { ...base, ...scenario.patch };
      const renovation = renovationSummary(op).actual;
      const commission = op.salePrice * op.commissionPct * (1 + (op.includeVat ? op.vatPct : 0));
      const saleCosts = op.salePrice * op.saleCostsPct;
      const purchaseCosts = op.purchasePrice * op.purchaseCostsPct;
      const ica = op.salePrice * op.icaPct;
      const fire = ica * op.fireSurchargePct;
      const total = op.purchasePrice + purchaseCosts + renovation + commission + saleCosts + op.fixedCosts + op.contingency + op.manualInterest + op.otherCosts + ica + fire;
      const gross = op.salePrice - total;
      const tax = Math.max(0, gross) * op.incomeTaxPct;
      const net = gross - tax;
      out[scenario.key] = { label: scenario.label, netProfit: net, netMargin: div(net, op.salePrice) };
    }
    return out;
  }

  function riskList(ctx) {
    const risks = [];
    const push = (severity, title, detail) => risks.push({ severity, title, detail });
    if (ctx.decision !== 'PASA') push('high', 'No cumple el margen objetivo', `La operación está ${Math.abs(ctx.roomVsMax).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })} por encima del precio máximo.`);
    if (ctx.comps.count < 5) push('high', 'Salida poco respaldada', `Solo hay ${ctx.comps.count} comparables válidos. La cifra de venta sigue siendo una opinión, no evidencia.`);
    if (ctx.comps.dispersion > 0.18 && ctx.comps.count) push('medium', 'Comparables dispersos', `La dispersión del precio por m² es ${(ctx.comps.dispersion * 100).toFixed(1)}%. Filtra atípicos y separa por edificio.`);
    if (ctx.netMargin < 0.03) push('high', 'Margen neto frágil', 'Una negociación, reparación oculta o demora normal puede borrar la utilidad.');
    else if (ctx.netMargin < 0.08) push('medium', 'Margen neto ajustado', 'No hay mucho colchón para errores de ejecución.');
    if (ctx.renovation.actual > ctx.operation.salePrice * 0.25) push('medium', 'Reforma pesada', 'La reforma supera el 25% del precio de salida. Exige presupuesto cerrado e hitos.');
    if (ctx.operation.durationDays > 180) push('medium', 'Capital inmovilizado', 'El plazo previsto supera seis meses antes de añadir retrasos y financiación.');
    if (ctx.stress.saleMinus10.netProfit < 0) push('high', 'La salida no soporta una rebaja del 10%', 'El escenario conservador convierte la operación en pérdida.');
    if (!risks.length) push('low', 'Riesgo controlado', 'Los números tienen colchón, pero valida títulos, cierres reales y presupuesto antes de ofertar.');
    return risks;
  }

  function financingScenario(raw, months, options = {}) {
    const base = normalizeOperation(raw);
    const result = calculate(base);
    const financeBaseType = options.baseType || 'sale';
    let financeBase = base.salePrice;
    if (financeBaseType === 'purchase') financeBase = base.purchasePrice;
    if (financeBaseType === 'cashCost') financeBase = result.breakdown.cashCost;
    if (financeBaseType === 'custom') financeBase = pos(options.customBase);
    const financePct = pos(options.financePct ?? base.financePct);
    const annualRate = pos(options.annualRate ?? base.annualRate);
    const bankFees = pos(options.bankFees ?? base.bankFees);
    const debt = financeBase * financePct;
    const interest = debt * annualRate * pos(months) / 12;
    const grossBeforeInterest = result.actual.grossProfitBeforeTax + base.manualInterest;
    const taxable = (options.interestDeductible ?? base.interestDeductible) ? Math.max(0, grossBeforeInterest - interest - bankFees) : Math.max(0, grossBeforeInterest);
    const tax = taxable * base.incomeTaxPct;
    const netProfit = grossBeforeInterest - interest - bankFees - tax;
    const ownCash = Math.max(0, result.breakdown.cashCost - debt);
    const roiOnCash = ownCash ? netProfit / ownCash : null;
    const monthlyInterest = debt * annualRate / 12;
    const breakEvenMonths = monthlyInterest ? grossBeforeInterest / monthlyInterest : null;
    const status = netProfit <= 0 ? 'PÉRDIDA' : netProfit / base.salePrice < 0.03 ? 'PELIGRO' : netProfit / base.salePrice < 0.08 ? 'AJUSTADO' : 'RENTABLE';
    return {
      months: pos(months), financeBase, debt, interest, bankFees, taxable, tax, netProfit, ownCash,
      roiOnCash, netMargin: div(netProfit, base.salePrice), monthlyInterest, breakEvenMonths, status,
      profitDestroyed: result.actual.netProfit - netProfit
    };
  }

  function maxPurchaseFor(raw, salePrice, targetMargin) {
    return calculate({ ...raw, salePrice, targetMargin }).actual.maxPurchase;
  }

  function netMarginFor(raw, salePrice, purchasePrice) {
    return calculate({ ...raw, salePrice, purchasePrice }).actual.netMargin;
  }

  return {
    DEFAULTS,
    normalizeOperation,
    renovationSummary,
    comparableSummary,
    calculate,
    financingScenario,
    maxPurchaseFor,
    netMarginFor,
    percentile
  };
});
