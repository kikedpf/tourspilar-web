(function(){
  'use strict';

  const E=window.PolancoEngine;
  if(!E||E.__NET_TARGET_V580__)return;

  const originalCalculate=E.calculate.bind(E);
  const originalFinancingScenario=E.financingScenario.bind(E);
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,Number(value)||0));
  const positive=value=>Math.max(0,Number(value)||0);

  function scoreLabel(total){
    return total>=80?'Excelente':total>=65?'Interesante':total>=50?'Revisar':total>=35?'Débil':'Descartar';
  }

  function calculate(raw={}){
    const result=originalCalculate(raw);
    const operation=result.operation;
    const salePrice=positive(operation.salePrice);
    const targetNetMargin=positive(operation.targetMargin);
    const targetNetProfit=salePrice*targetNetMargin;
    const incomeTaxPct=clamp(operation.incomeTaxPct,0,0.999999);
    const requiredPreTaxProfit=targetNetProfit/(1-incomeTaxPct);

    const nonPurchaseCosts=
      positive(result.breakdown.renovationTotal)+
      positive(result.breakdown.commissionTotal)+
      positive(result.breakdown.saleCosts)+
      positive(result.breakdown.fixedCosts)+
      positive(result.breakdown.contingency)+
      positive(result.breakdown.manualInterest)+
      positive(result.breakdown.otherCosts)+
      positive(result.breakdown.ica)+
      positive(result.breakdown.fireSurcharge);

    const purchaseCostFactor=1+positive(operation.purchaseCostsPct);
    const maxPurchase=Math.max(0,(salePrice-nonPurchaseCosts-requiredPreTaxProfit)/purchaseCostFactor);
    const roomVsMax=maxPurchase-positive(operation.purchasePrice);
    const decision=result.actual.netMargin>=targetNetMargin?'PASA':'NO PASA';

    result.actual.maxPurchase=maxPurchase;
    result.actual.roomVsMax=roomVsMax;
    result.actual.decision=decision;
    result.target={
      basis:'net_after_income_tax',
      targetNetMargin,
      targetNetProfit,
      requiredPreTaxProfit,
      requiredPreTaxMargin:salePrice?requiredPreTaxProfit/salePrice:0,
      maxPurchase
    };

    const marginScore=targetNetMargin>0?clamp(result.actual.netMargin/targetNetMargin,0,1)*28:28;
    const roiScore=clamp(result.actual.roi/0.18,0,1)*22;
    const priceScore=clamp(roomVsMax/Math.max(positive(operation.purchasePrice)*0.08,1)+0.5,0,1)*18;
    const compScore=clamp(result.comparables.confidence/100,0,1)*18;
    const renovationScore=clamp(1-positive(result.renovation.actual)/Math.max(salePrice*0.35,1),0,1)*8;
    const timeScore=clamp(1-(positive(operation.durationDays)-90)/270,0,1)*6;
    const total=Math.round(clamp(marginScore+roiScore+priceScore+compScore+renovationScore+timeScore,0,100));
    result.score={...result.score,total,label:scoreLabel(total),marginScore,roiScore,priceScore,compScore,renovationScore,timeScore};

    result.risks=(result.risks||[]).filter(r=>r.title!=='No cumple el margen objetivo'&&!(decision==='NO PASA'&&r.title==='Riesgo controlado'));
    if(decision==='NO PASA'){
      result.risks.unshift({
        severity:'high',
        title:'No cumple el objetivo neto',
        detail:`La oferta está ${Math.abs(roomVsMax).toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0})} por encima del precio máximo para lograr el ${(targetNetMargin*100).toFixed(2).replace('.',',')}% neto después de renta.`
      });
    }

    return result;
  }

  function financingScenario(raw={},months,options={}){
    const scenario=originalFinancingScenario(raw,months,options);
    const targetNetMargin=positive(raw.targetMargin??E.DEFAULTS.targetMargin);
    scenario.meetsTarget=scenario.netMargin>=targetNetMargin;
    scenario.targetNetMargin=targetNetMargin;
    scenario.status=scenario.netProfit<=0?'PÉRDIDA':scenario.meetsTarget?'RENTABLE':scenario.netMargin>=targetNetMargin*0.67?'AJUSTADO':'PELIGRO';
    return scenario;
  }

  E.calculate=calculate;
  E.financingScenario=financingScenario;
  E.maxPurchaseFor=(raw,salePrice,targetMargin)=>calculate({...raw,salePrice,targetMargin}).actual.maxPurchase;
  E.netMarginFor=(raw,salePrice,purchasePrice)=>calculate({...raw,salePrice,purchasePrice}).actual.netMargin;
  E.__NET_TARGET_V580__=true;
})();
