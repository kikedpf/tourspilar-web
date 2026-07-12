(function(){
  'use strict';
  const KEY='polanco_os_operations_v2';
  const VERSION_KEY='polanco_excel_model_version';
  const VERSION='excel-2026-07-v1';
  const defaults={
    salePrice:270000000,
    purchasePrice:150000000,
    area:55,
    renovationPerSqm:1100000,
    targetMargin:0.15,
    durationDays:60,
    commissionPct:0.03,
    vatPct:0.19,
    includeVat:true,
    saleCostsPct:0.005,
    purchaseCostsPct:0.018,
    fixedCosts:2000000,
    contingency:3000000,
    manualInterest:0,
    incomeTaxPct:0.35,
    icaPct:0.01,
    fireSurchargePct:0,
    otherCosts:0,
    marketGray:170000000
  };
  try{
    const stored=JSON.parse(localStorage.getItem(KEY)||'[]');
    if(Array.isArray(stored)){
      let changed=false;
      const migrated=stored.map(op=>{
        if(!op||typeof op!=='object')return op;
        const next={...op};
        for(const [key,value] of Object.entries(defaults)){
          if(next[key]===undefined||next[key]===null||next[key]===''){next[key]=value;changed=true;}
        }
        // Corrige exclusivamente la demo dañada que quedó con dos ceros menos.
        if((next.isDemo||next.id==='demo-polanco-os')&&Number(next.purchasePrice)>0&&Number(next.purchasePrice)<50000000){
          next.purchasePrice=150000000;
          changed=true;
        }
        return next;
      });
      if(changed)localStorage.setItem(KEY,JSON.stringify(migrated));
    }
    localStorage.setItem(VERSION_KEY,VERSION);
  }catch(error){console.error('No se pudo migrar el modelo Excel',error);}
})();
