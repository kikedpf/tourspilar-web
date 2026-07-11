(async()=>{
  const decode=(b64)=>{
    const clean=b64.replace(/\s+/g,"");
    const bin=atob(clean);
    const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };
  const fetchText=async path=>{
    const response=await fetch(`${path}?v=4`,{cache:"no-store"});
    if(!response.ok) throw new Error(`No se pudo cargar ${path}`);
    return response.text();
  };
  const injectMobileUi=()=>{
    const dashboard=document.querySelector('[data-view-panel="dashboard"]');
    if(dashboard&&!document.querySelector('.mobile-command-center')){
      dashboard.insertAdjacentHTML('afterbegin',`<section class="mobile-command-center" aria-label="Resumen ejecutivo de la operación"><div class="mobile-operation-bar"><div><span class="mobile-overline">OPERACIÓN ACTIVA</span><strong id="mobile-project-label">Nueva operación</strong></div><button class="mobile-save-btn" id="mobile-save-btn" type="button">Guardar</button></div><article class="mobile-decision-card" id="mobile-decision-card"><div><span class="mobile-overline">DECISIÓN</span><h2 id="mobile-decision-value">—</h2><p id="mobile-decision-detail">Introduce los datos para evaluar la operación.</p></div><div class="mobile-decision-icon" id="mobile-decision-icon">?</div></article><div class="mobile-kpi-grid"><article><span>Compra</span><strong id="mobile-purchase">—</strong></article><article class="mobile-kpi-max"><span>Precio máximo</span><strong id="mobile-max-purchase">—</strong></article><article><span>Utilidad neta</span><strong id="mobile-net-profit">—</strong></article><article><span>ROI proyecto</span><strong id="mobile-roi">—</strong></article></div><div class="mobile-margin-strip"><span>Margen neto</span><strong id="mobile-net-margin">—</strong><span class="mobile-room" id="mobile-room">—</span></div><article class="mobile-signal mobile-alert"><div class="mobile-signal-icon">!</div><div><span>ATENCIÓN</span><strong id="mobile-alert-text">Sin datos suficientes.</strong></div></article><article class="mobile-signal mobile-action"><div class="mobile-signal-icon">→</div><div><span>SIGUIENTE MOVIMIENTO</span><strong id="mobile-next-action">Completa los datos de la operación.</strong></div><button id="mobile-edit-btn" type="button">Editar</button></article></section>`);
      const firstStack=dashboard.querySelector('.dashboard-grid > .stack');
      firstStack?.classList.add('input-stack');
      const formCard=firstStack?.querySelector('.card');
      if(formCard){formCard.classList.add('operation-form-card');formCard.id='operation-form-card';}
      const cards=firstStack?.querySelectorAll('.card');
      cards?.[1]?.classList.add('breakdown-card');
      const resultCards=dashboard.querySelectorAll('.sticky-results > .card');
      resultCards?.[resultCards.length-1]?.classList.add('target-card');
    }
    if(!document.querySelector('.mobile-bottom-nav')){
      const toast=document.getElementById('toast');
      toast?.insertAdjacentHTML('beforebegin',`<nav class="mobile-bottom-nav" aria-label="Navegación móvil"><button class="nav-btn mobile-nav-btn active" data-view="dashboard"><span>◫</span><small>Analizador</small></button><button class="nav-btn mobile-nav-btn" data-view="sensitivity"><span>▦</span><small>Sensibilidad</small></button><button class="nav-btn mobile-nav-btn" data-view="finance"><span>↗</span><small>Financiación</small></button><button class="nav-btn mobile-nav-btn" data-view="operations"><span>⌂</span><small>Operaciones</small></button><button class="nav-btn mobile-nav-btn" data-view="compare"><span>⇄</span><small>Comparar</small></button></nav>`);
    }
  };
  const cssB64=await fetchText('css/mobile-v2.b64');
  const style=document.createElement('style');
  style.id='polanco-mobile-v2';
  style.textContent=decode(cssB64);
  document.head.appendChild(style);
  injectMobileUi();
  const parts=[];
  for(let i=0;i<8;i++) parts.push(await fetchText(`js/app-core-${String(i).padStart(2,'0')}.b64`));
  (0,eval)(decode(parts.join('')));
})().catch(error=>{
  console.error(error);
  const toast=document.getElementById('toast');
  if(toast){toast.textContent='No se pudo cargar la aplicación. Recarga la página.';toast.classList.add('show');}
});
