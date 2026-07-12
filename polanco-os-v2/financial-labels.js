(function(){
  'use strict';

  const root=document.getElementById('view-root');
  if(!root)return;

  function replaceDirectText(element,from,to){
    if(!element)return;
    for(const node of element.childNodes){
      if(node.nodeType===Node.TEXT_NODE&&node.textContent.trim()===from){
        node.textContent=node.textContent.replace(from,to);
        return;
      }
    }
  }

  function replaceExact(selector,from,to){
    root.querySelectorAll(selector).forEach(element=>{
      if(element.textContent.trim()===from)element.textContent=to;
    });
  }

  function apply(){
    replaceExact('.mini-stat span','Objetivo','Objetivo bruto antes de renta');
    replaceExact('.finance-overview-head small','Antes y después de impuestos','Antes y después de renta');
    replaceExact('.finance-metric.gross span','Utilidad antes de impuestos','Utilidad antes de renta');
    replaceExact('.finance-mini span','Margen antes','Margen bruto obtenido');
    replaceExact('.finance-mini span','Margen después','Margen neto');
    replaceExact('.finance-mini span','ROI','ROI neto');

    replaceExact('.available-margin small','Margen disponible frente al máximo','Diferencia respecto al precio máximo de compra');
    replaceExact('.result-stat span','Margen disponible','Diferencia respecto al precio máximo de compra');
    replaceExact('.kpi span','Margen frente al máximo','Diferencia respecto al precio máximo de compra');
    replaceExact('.result-stat small','Puedes pagar hasta este margen adicional','La oferta está por debajo del máximo de compra');
    replaceExact('.result-stat small','La oferta supera el máximo permitido','La oferta supera el máximo de compra');

    root.querySelectorAll('label').forEach(label=>{
      replaceDirectText(label,'Margen bruto objetivo','Objetivo bruto antes de renta');
    });

    replaceExact('.kpi span','ROI proyecto','ROI neto');
    replaceExact('.result-stat span','ROI del proyecto','ROI neto');
  }

  if(!document.getElementById('financial-label-clarity-styles')){
    const style=document.createElement('style');
    style.id='financial-label-clarity-styles';
    style.textContent=`
      @media(max-width:760px){
        .mini-stat span{line-height:1.12;min-height:16px;display:flex;align-items:center;justify-content:center}
        .margin-summary .finance-mini span{min-height:22px;display:flex;align-items:center;justify-content:center;line-height:1.08;white-space:normal}
        .available-margin small{line-height:1.18;max-width:220px}
        .result-stat span{line-height:1.12}
      }
    `;
    document.head.appendChild(style);
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(apply));
  observer.observe(root,{childList:true,subtree:true});
  window.addEventListener('polanco:app-ready',()=>setTimeout(apply,0));
  document.addEventListener('DOMContentLoaded',apply);
  setTimeout(apply,200);
})();
