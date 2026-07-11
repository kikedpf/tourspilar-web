(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PolancoLogic = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const DEFAULTS = Object.freeze({
    salePrice: 270000000,
    purchasePrice: 150000000,
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
    otherTaxes: 0,
    marketValueGray: 170000000,
    financePct: 0.70,
    annualRate: 0.16,
    financeMode: "actual",
    financeBase: "sale",
    customFinanceBase: 270000000,
    customMonths: 9,
    interestDeductible: true,
    showEur: true,
    fxCopPerEur: 4500
  });

  const num = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const div = (a, b) => b ? a / b : 0;
  const positive = value => Math.max(0, value);

  function normalize(raw) {
    return {
      ...DEFAULTS,
      ...raw,
      salePrice: positive(num(raw.salePrice, DEFAULTS.salePrice)),
      purchasePrice: positive(num(raw.purchasePrice, DEFAULTS.purchasePrice)),
      area: positive(num(raw.area, DEFAULTS.area)),
      renovationPerSqm: positive(num(raw.renovationPerSqm, DEFAULTS.renovationPerSqm)),
      targetMargin: positive(num(raw.targetMargin, DEFAULTS.targetMargin)),
      durationDays: positive(num(raw.durationDays, DEFAULTS.durationDays)),
      commissionPct: positive(num(raw.commissionPct, DEFAULTS.commissionPct)),
      vatPct: positive(num(raw.vatPct, DEFAULTS.vatPct)),
      includeVat: Boolean(raw.includeVat),
      saleCostsPct: positive(num(raw.saleCostsPct, DEFAULTS.saleCostsPct)),
      purchaseCostsPct: positive(num(raw.purchaseCostsPct, DEFAULTS.purchaseCostsPct)),
      fixedCosts: positive(num(raw.fixedCosts, DEFAULTS.fixedCosts)),
      contingency: positive(num(raw.contingency, DEFAULTS.contingency)),
      manualInterest: positive(num(raw.manualInterest, DEFAULTS.manualInterest)),
      incomeTaxPct: positive(num(raw.incomeTaxPct, DEFAULTS.incomeTaxPct)),
      icaPct: positive(num(raw.icaPct, DEFAULTS.icaPct)),
      fireSurchargePct: positive(num(raw.fireSurchargePct, DEFAULTS.fireSurchargePct)),
      otherTaxes: positive(num(raw.otherTaxes, DEFAULTS.otherTaxes)),
      marketValueGray: positive(num(raw.marketValueGray, DEFAULTS.marketValueGray))
    };
  }

  function calculate(raw) {
    const i = normalize(raw || {});
    const renovationTotal = i.area * i.renovationPerSqm;
    const commissionTotal = i.salePrice * i.commissionPct * (1 + i.vatPct * (i.includeVat ? 1 : 0));
    const saleCosts = i.salePrice * i.saleCostsPct;
    const ica = i.salePrice * i.icaPct;
    const fireSurcharge = ica * i.fireSurchargePct;

    const grossProfitTarget = i.salePrice * i.targetMargin;
    const targetTax = positive(grossProfitTarget) * i.incomeTaxPct;
    const targetNetProfit = grossProfitTarget - targetTax;

    const maxPurchaseNumerator =
      i.salePrice -
      renovationTotal -
      commissionTotal -
      saleCosts -
      ica -
      fireSurcharge -
      i.fixedCosts -
      i.contingency -
      i.otherTaxes -
      grossProfitTarget;

    const maxPurchase = positive(div(maxPurchaseNumerator, 1 + i.purchaseCostsPct));
    const maxPurchaseCosts = maxPurchase * i.purchaseCostsPct;
    const targetTotalCost =
      maxPurchase +
      maxPurchaseCosts +
      renovationTotal +
      commissionTotal +
      saleCosts +
      ica +
      fireSurcharge +
      i.fixedCosts +
      i.contingency +
      i.otherTaxes;

    const targetGrossAtMax = i.salePrice - targetTotalCost;
    const targetTaxAtMax = positive(targetGrossAtMax) * i.incomeTaxPct;
    const targetNetAtMax = targetGrossAtMax - targetTaxAtMax;

    const realPurchaseCosts = i.purchasePrice * i.purchaseCostsPct;
    const cashCost =
      i.purchasePrice +
      realPurchaseCosts +
      renovationTotal +
      commissionTotal +
      saleCosts +
      i.fixedCosts +
      i.contingency +
      i.manualInterest +
      i.otherTaxes;

    const grossProfitBeforeTax = i.salePrice - cashCost - ica - fireSurcharge;
    const incomeTax = positive(grossProfitBeforeTax) * i.incomeTaxPct;
    const netProfit = grossProfitBeforeTax - incomeTax;
    const grossMargin = div(grossProfitBeforeTax, i.salePrice);
    const netMargin = div(netProfit, i.salePrice);
    const roi = div(netProfit, cashCost);
    const annualizedRoi = i.durationDays ? roi * 365 / i.durationDays : 0;
    const decision = grossMargin >= i.targetMargin ? "PASA" : "NO PASA";

    const saleDown10 = calculateStress(i, -10000000);
    const roomVsMax = maxPurchase - i.purchasePrice;

    return {
      inputs: i,
      breakdown: {
        purchasePrice: i.purchasePrice,
        purchaseCosts: realPurchaseCosts,
        renovationTotal,
        commissionTotal,
        saleCosts,
        ica,
        fireSurcharge,
        fixedCosts: i.fixedCosts,
        contingency: i.contingency,
        manualInterest: i.manualInterest,
        otherTaxes: i.otherTaxes,
        cashCost,
        totalEconomicCost: cashCost + ica + fireSurcharge
      },
      actual: {
        cashCost,
        grossProfitBeforeTax,
        incomeTax,
        netProfit,
        grossMargin,
        netMargin,
        roi,
        annualizedRoi,
        decision,
        roomVsMax
      },
      target: {
        grossProfitTarget,
        targetTax,
        targetNetProfit,
        maxPurchase,
        maxPurchaseCosts,
        totalCost: targetTotalCost,
        grossProfitAtMax: targetGrossAtMax,
        incomeTaxAtMax: targetTaxAtMax,
        netProfitAtMax: targetNetAtMax,
        netMarginAtMax: div(targetNetAtMax, i.salePrice),
        roiAtMax: div(targetNetAtMax, targetTotalCost),
        discountVsGray: i.marketValueGray ? 1 - maxPurchase / i.marketValueGray : 0
      },
      stress: {
        saleDown10NetProfit: saleDown10.netProfit,
        saleDown10NetMargin: saleDown10.netMargin,
        profitImpact: netProfit - saleDown10.netProfit
      }
    };
  }

  function calculateStress(i, saleDelta) {
    const stressed = { ...i, salePrice: positive(i.salePrice + saleDelta) };
    const renovationTotal = stressed.area * stressed.renovationPerSqm;
    const commissionTotal = stressed.salePrice * stressed.commissionPct * (1 + stressed.vatPct * (stressed.includeVat ? 1 : 0));
    const saleCosts = stressed.salePrice * stressed.saleCostsPct;
    const ica = stressed.salePrice * stressed.icaPct;
    const fire = ica * stressed.fireSurchargePct;
    const purchaseCosts = stressed.purchasePrice * stressed.purchaseCostsPct;
    const cashCost = stressed.purchasePrice + purchaseCosts + renovationTotal + commissionTotal + saleCosts +
      stressed.fixedCosts + stressed.contingency + stressed.manualInterest + stressed.otherTaxes;
    const gross = stressed.salePrice - cashCost - ica - fire;
    const tax = positive(gross) * stressed.incomeTaxPct;
    const netProfit = gross - tax;
    return { netProfit, netMargin: div(netProfit, stressed.salePrice) };
  }

  function maxPurchaseFor(raw, salePrice, targetMargin) {
    const i = normalize({ ...raw, salePrice, targetMargin });
    return calculate(i).target.maxPurchase;
  }

  function netMarginFor(raw, salePrice, purchasePrice) {
    const result = calculate({ ...raw, salePrice, purchasePrice, manualInterest: 0 });
    return result.actual.netMargin;
  }

  function financingScenario(raw, months, financeOptions) {
    const baseInput = normalize({ ...raw, manualInterest: 0 });
    const options = {
      financePct: num(financeOptions.financePct, DEFAULTS.financePct),
      annualRate: num(financeOptions.annualRate, DEFAULTS.annualRate),
      mode: financeOptions.mode || "actual",
      base: financeOptions.base || "sale",
      customBase: num(financeOptions.customBase, baseInput.salePrice),
      interestDeductible: financeOptions.interestDeductible !== false
    };

    let operation = calculate(baseInput);
    if (options.mode === "target") {
      operation = calculate({ ...baseInput, purchasePrice: operation.target.maxPurchase, manualInterest: 0 });
    }

    let financeBase = operation.inputs.salePrice;
    if (options.base === "purchase") financeBase = operation.inputs.purchasePrice;
    if (options.base === "cashCost") financeBase = operation.actual.cashCost;
    if (options.base === "custom") financeBase = positive(options.customBase);

    const debt = positive(financeBase * options.financePct);
    const annualRate = positive(options.annualRate);
    const termMonths = positive(num(months));
    const interest = debt * annualRate * termMonths / 12;
    const grossBeforeInterest = operation.actual.grossProfitBeforeTax;
    const taxableIncome = options.interestDeductible
      ? positive(grossBeforeInterest - interest)
      : positive(grossBeforeInterest);
    const incomeTax = taxableIncome * operation.inputs.incomeTaxPct;
    const netProfit = grossBeforeInterest - interest - incomeTax;
    const ownCash = positive(operation.actual.cashCost - debt);
    const netMargin = div(netProfit, operation.inputs.salePrice);
    const roiOnCash = ownCash > 0 ? netProfit / ownCash : null;
    const noFinanceTax = positive(grossBeforeInterest) * operation.inputs.incomeTaxPct;
    const noFinanceNet = grossBeforeInterest - noFinanceTax;
    const lostProfit = noFinanceNet - netProfit;
    const monthlyInterest = debt * annualRate / 12;
    const breakEvenMonths = monthlyInterest > 0 ? grossBeforeInterest / monthlyInterest : null;

    let status = "RENTABLE";
    if (netProfit <= 0) status = "PÉRDIDA";
    else if (netMargin < 0.03) status = "PELIGRO";
    else if (netMargin < 0.08) status = "AJUSTADO";

    return {
      months: termMonths,
      operation,
      financeBase,
      debt,
      interest,
      grossBeforeInterest,
      taxableIncome,
      incomeTax,
      netProfit,
      ownCash,
      netMargin,
      roiOnCash,
      noFinanceNet,
      lostProfit,
      monthlyInterest,
      breakEvenMonths,
      status
    };
  }

  return {
    DEFAULTS,
    calculate,
    maxPurchaseFor,
    netMarginFor,
    financingScenario
  };
});