(function () {
  'use strict';

  const STORAGE = {
    operations: 'polanco_os_operations_v2',
    current: 'polanco_os_current_v2'
  };
  const RENOVATION_RATE = 1100000;
  const root = document.getElementById('view-root');
  if (!root) return;

  const money = value => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(Number(value) || 0);
  const integer = value => new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(Number(value) || 0);
  const pct = value => new Intl.NumberFormat('es-ES', {
    style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(Number(value) || 0);
  const compactMoney = value => {
    const n = Number(value) || 0;
    if (Math.abs(n) >= 1000000) return `$ ${(n / 1000000).toFixed(Math.abs(n) % 1000000 === 0 ? 0 : 1).replace('.', ',')} M`;
    return money(n);
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const parseMoney = value => Math.max(0, Number(String(value ?? '').replace(/\D/g, '')) || 0);
  const parseNumber = value => Math.max(0, Number(String(value ?? '').replace(',', '.')) || 0);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));

  function readOperations() {
    try {
      const operations = JSON.parse(localStorage.getItem(STORAGE.operations) || '[]');
      return Array.isArray(operations) ? operations : [];
    } catch (_) {
      return [];
    }
  }

  function writeOperations(operations) {
    localStorage.setItem(STORAGE.operations, JSON.stringify(operations));
  }

  function currentOperationId() {
    return document.getElementById('current-operation')?.value || localStorage.getItem(STORAGE.current);
  }

  function activeOperation() {
    const operations = readOperations();
    const currentId = currentOperationId();
    const operation = operations.find(op => op.id === currentId) || operations[0] || null;
    if (!operation) return null;

    const needsExcelModel = Number(operation.renovationPerSqm) !== RENOVATION_RATE ||
      (Array.isArray(operation.renovationItems) && operation.renovationItems.length > 0);

    if (needsExcelModel) {
      operation.renovationPerSqm = RENOVATION_RATE;
      operation.renovationItems = [];
      operation.updatedAt = new Date().toISOString();
      writeOperations(operations);
    }
    return operation;
  }

  function isDashboard() {
    return document.querySelector('.nav-item.active')?.dataset?.view === 'dashboard' ||
      document.getElementById('page-title')?.textContent?.trim() === 'Panel ejecutivo';
  }

  function calculate(operation) {
    try {
      const excelOperation = {
        ...operation,
        renovationPerSqm: RENOVATION_RATE,
        renovationItems: []
      };
      return window.PolancoEngine?.calculate(excelOperation) || null;
    } catch (error) {
      console.error('Dashboard móvil:', error);
      return null;
    }
  }

  function editableMoney(key, label, value, helper) {
    return `<article class="input-card">
      <div class="input-card-head"><span>${esc(label)}</span><small>${esc(helper)}</small></div>
      <label class="price-editor">
        <b>$</b>
        <input data-operation-input="${esc(key)}" data-input-type="money" type="text" inputmode="numeric" value="${esc(integer(value))}" aria-label="${esc(label)}">
        <em>COP</em>
      </label>
    </article>`;
  }

  function editableArea(value) {
    return `<article class="area-card">
      <div><span>Área del inmueble</span><small>Modifica los m² del apartamento</small></div>
      <label class="area-editor">
        <input data-operation-input="area" data-input-type="number" type="number" inputmode="decimal" min="1" step="0.1" value="${esc(value)}" aria-label="Área del inmueble">
        <em>m²</em>
      </label>
    </article>`;
  }

  function miniStat(label, value) {
    return `<div class="mini-stat"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`;
  }

  function resultStat(label, value, helper, tone = '') {
    return `<div class="result-stat ${tone}"><div><span>${esc(label)}</span><small>${esc(helper)}</small></div><strong>${esc(value)}</strong></div>`;
  }

  function summaryHtml(operation, result) {
    if (!operation || !result) {
      return `<section class="mobile-command-center"><div class="exec-empty"><strong>Sin operación activa</strong><span>Crea o selecciona una operación para analizarla.</span></div></section>`;
    }

    const pass = result.actual.decision === 'PASA';
    const room = Number(result.actual.roomVsMax) || 0;
    const score = clamp(result.score?.total, 0, 100);
    const salePrice = Number(operation.salePrice) || 0;
    const purchasePrice = Number(operation.purchasePrice) || 0;
    const area = Number(operation.area) || 0;
    const targetMargin = Number(result.operation?.targetMargin ?? operation.targetMargin) || 0;
    const renovationTotal = area * RENOVATION_RATE;
    const roomText = room >= 0 ? money(room) : `−${money(Math.abs(room))}`;
    const roomHelper = room >= 0 ? 'Puedes pagar hasta este margen adicional' : 'La oferta supera el máximo permitido';

    return `<section class="mobile-command-center" aria-label="Dashboard ejecutivo móvil">
      <div class="exec-toolbar">
        <div class="exec-kicker"><i></i><span>Resumen de operación</span></div>
        <button id="mobile-open-analyzer" class="exec-open-btn" type="button">Abrir ficha</button>
      </div>

      <article class="decision-hero ${pass ? 'pass' : 'fail'}">
        <div class="decision-main">
          <span>${esc(operation.name || 'Operación activa')}</span>
          <h2>${esc(result.actual.decision)}</h2>
          <div class="available-margin">
            <small>Margen disponible frente al máximo</small>
            <strong>${esc(roomText)}</strong>
          </div>
        </div>
        <div class="score-badge"><strong>${integer(score)}</strong><small>SCORE</small></div>
      </article>

      <div class="dashboard-columns">
        <section class="dashboard-section inputs-section">
          <header><span>Variables de decisión</span><small>Los cambios se guardan y recalculan</small></header>
          ${editableMoney('salePrice', 'Precio de venta esperado', salePrice, 'Salida probable')}
          ${editableMoney('purchasePrice', 'Oferta de compra', purchasePrice, 'Aquí se decide el negocio')}
          ${editableArea(area)}
          <div class="property-strip two">
            ${miniStat('Reforma / m²', compactMoney(RENOVATION_RATE))}
            ${miniStat('Objetivo', pct(targetMargin))}
          </div>
          <div class="renovation-total-card">
            <span>Reforma total estimada</span>
            <strong>${esc(money(renovationTotal))}</strong>
            <small>${integer(area)} m² × ${money(RENOVATION_RATE)}</small>
          </div>
        </section>

        <section class="dashboard-section results-section">
          <header><span>Límite y resultado</span><small>Lo que devuelve la operación</small></header>
          <div class="limit-card">
            <span>Precio máximo de compra</span>
            <strong>${esc(money(result.actual.maxPurchase))}</strong>
            <small>No deberías pagar más</small>
          </div>
          ${resultStat('Margen disponible', roomText, roomHelper, room >= 0 ? 'positive' : 'negative')}
          <div class="financial-group">
            ${resultStat('Inversión total', money(result.breakdown.cashCost), 'Compra + reforma + costes')}
            ${resultStat('Utilidad neta', money(result.actual.netProfit), 'Después de costes, sin deuda', result.actual.netProfit >= 0 ? 'positive' : 'negative')}
            ${resultStat('Margen neto', pct(result.actual.netMargin), 'Utilidad / venta')}
            ${resultStat('ROI del proyecto', pct(result.actual.roi), 'Utilidad / inversión')}
          </div>
        </section>
      </div>

      <section class="deal-flow" aria-label="Flujo financiero de la operación">
        <div><span>Compra</span><strong>${esc(compactMoney(purchasePrice))}</strong></div>
        <i>→</i>
        <div><span>Reforma</span><strong>${esc(compactMoney(renovationTotal))}</strong></div>
        <i>→</i>
        <div><span>Inversión</span><strong>${esc(compactMoney(result.breakdown.cashCost))}</strong></div>
        <i>→</i>
        <div><span>Venta</span><strong>${esc(compactMoney(salePrice))}</strong></div>
        <i>→</i>
        <div class="flow-profit"><span>Utilidad</span><strong>${esc(compactMoney(result.actual.netProfit))}</strong></div>
      </section>
    </section>`;
  }

  function injectStyles() {
    let style = document.getElementById('mobile-executive-dashboard-styles');
    if (style) style.remove();
    style = document.createElement('style');
    style.id = 'mobile-executive-dashboard-styles';
    style.textContent = `
      @media (min-width:761px){.mobile-command-center{display:none!important}}
      @media (max-width:760px){
        #view-root.mobile-exec-ready>.mobile-command-center{display:grid!important}
        #view-root.mobile-exec-ready>:not(.mobile-command-center){display:none!important}
        .mobile-command-center{gap:12px;margin:0 0 18px!important;color:#14233b}
        .exec-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 2px}
        .exec-kicker{display:flex;align-items:center;gap:8px;color:#6b7b94;font-size:10px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
        .exec-kicker i{width:9px;height:9px;border-radius:50%;background:#59a9dc;box-shadow:0 0 0 5px rgba(89,169,220,.14)}
        .exec-open-btn{border:1px solid #b9d4e8;background:#f7fbff;color:#2d6f9f;border-radius:14px;padding:9px 13px;font-size:12px;font-weight:900;box-shadow:0 5px 14px rgba(55,104,145,.08)}
        .decision-hero{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 18px;border-radius:24px;color:#fff;box-shadow:0 18px 34px rgba(45,111,159,.22)}
        .decision-hero.pass{background:linear-gradient(135deg,#58a8dc,#3f86c6 58%,#73b7e4)}
        .decision-hero.fail{background:linear-gradient(135deg,#6e88a8,#5d6f89 58%,#8fa1b7)}
        .decision-main{min-width:0;display:grid;gap:5px}.decision-main>span{font-size:10px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;opacity:.82;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.decision-main h2{margin:0;font-size:34px;line-height:1;font-weight:950;letter-spacing:-.04em}
        .available-margin{display:grid;gap:1px;margin-top:3px}.available-margin small{font-size:10px;color:rgba(255,255,255,.82)}.available-margin strong{font-size:19px;line-height:1.1;font-weight:950}
        .score-badge{width:74px;height:74px;flex:0 0 auto;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,.16);border:4px solid rgba(213,240,255,.7);box-shadow:inset 0 0 0 3px rgba(255,255,255,.12)}.score-badge strong{font-size:27px;line-height:1;font-weight:950}.score-badge small{font-size:8px;font-weight:900;letter-spacing:.15em;margin-top:3px}
        .dashboard-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;align-items:start}
        .dashboard-section{display:grid;gap:9px;padding:11px;border-radius:22px;background:#fff;border:1px solid #dbe7f2;box-shadow:0 12px 26px rgba(43,90,127,.08);min-width:0}
        .dashboard-section>header{display:grid;gap:2px;padding:0 3px 3px}.dashboard-section>header span{font-size:11px;font-weight:950;letter-spacing:.11em;text-transform:uppercase;color:#3479aa}.dashboard-section>header small{font-size:9px;color:#8b98aa}
        .input-card,.area-card{display:grid;gap:7px;padding:9px;border-radius:15px;background:#f7fbff;border:1px solid #d5e4f0}.input-card-head,.area-card>div{display:grid;gap:2px}.input-card-head span,.area-card span{font-size:8px;font-weight:950;letter-spacing:.06em;text-transform:uppercase;color:#617188}.input-card-head small,.area-card small{font-size:8px;color:#94a0b1}
        .price-editor,.area-editor{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:5px;padding:9px 10px;border-radius:12px;background:#fff;border:1px solid #b8d4e7}.area-editor{grid-template-columns:minmax(0,1fr) auto}.price-editor b,.price-editor em,.area-editor em{font-style:normal;font-size:9px;font-weight:900;color:#8290a3}.price-editor input,.area-editor input{width:100%;min-width:0;border:0!important;background:transparent!important;padding:0!important;box-shadow:none!important;outline:0!important;font-size:17px!important;font-weight:950!important;color:#2d6f9f!important}
        .property-strip{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px}.property-strip.two{grid-template-columns:1fr 1fr}.mini-stat{display:grid;gap:3px;min-width:0;padding:7px 5px;border-radius:11px;background:#edf6fc;text-align:center}.mini-stat span{font-size:7px;font-weight:900;text-transform:uppercase;color:#728198}.mini-stat strong{font-size:11px;line-height:1.05;color:#244d70;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .renovation-total-card{display:grid;gap:3px;padding:10px;border-radius:14px;background:#eaf5fc;border:1px solid #bad7e9}.renovation-total-card span{font-size:8px;font-weight:950;text-transform:uppercase;color:#58718a}.renovation-total-card strong{font-size:17px;color:#245f8b;font-weight:950}.renovation-total-card small{font-size:8px;color:#8191a4}
        .limit-card{display:grid;gap:3px;padding:11px;border-radius:15px;background:linear-gradient(145deg,#eaf5fc,#f7fbfe);border:1px solid #b7d5e9}.limit-card span{font-size:8px;font-weight:950;letter-spacing:.06em;text-transform:uppercase;color:#5a6d84}.limit-card strong{font-size:18px;line-height:1.05;color:#245f8b;font-weight:950}.limit-card small{font-size:8px;color:#8796a8}
        .result-stat{display:grid;gap:5px;padding:8px 9px;border-radius:13px;background:#f6f9fc;border:1px solid #dce6ef}.result-stat>div{display:grid;gap:1px}.result-stat span{font-size:7.5px;font-weight:950;letter-spacing:.05em;text-transform:uppercase;color:#64748a}.result-stat small{font-size:7.5px;color:#909cad}.result-stat strong{font-size:14px;line-height:1.05;color:#1d2f48;font-weight:950}.result-stat.positive{background:#edf6fc;border-color:#bdd9ea}.result-stat.positive strong{color:#2d6f9f}.result-stat.negative{background:#f4f1f2;border-color:#d8c9ce}.result-stat.negative strong{color:#79515d}.financial-group{display:grid;gap:6px;padding-top:2px}
        .deal-flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr auto 1fr;align-items:center;gap:4px;padding:11px 8px;border-radius:18px;background:#edf5fb;border:1px solid #c9ddeb;box-shadow:0 8px 18px rgba(43,90,127,.06)}.deal-flow div{display:grid;gap:2px;text-align:center;min-width:0}.deal-flow span{font-size:6.5px;font-weight:900;text-transform:uppercase;color:#728198}.deal-flow strong{font-size:9px;color:#244d70;white-space:nowrap}.deal-flow i{font-style:normal;color:#7faed0;font-weight:900}.deal-flow .flow-profit strong{color:#2d6f9f}
        .exec-empty{display:grid;gap:4px;padding:16px;border-radius:18px;background:#fff;border:1px solid #dbe7f2;color:#627084}
        html[data-theme="dark"] .dashboard-section,html[data-theme="dark"] .exec-open-btn,html[data-theme="dark"] .exec-empty{background:#152235;border-color:#2a3d58;color:#e8eef7}
        @media(max-width:380px){.dashboard-columns{grid-template-columns:1fr}.deal-flow{grid-template-columns:1fr auto 1fr auto 1fr}.deal-flow div:nth-of-type(n+4),.deal-flow i:nth-of-type(n+3){display:none}}
      }
    `;
    document.head.appendChild(style);
  }

  function saveField(key, rawValue, inputType) {
    const value = inputType === 'money' ? parseMoney(rawValue) : parseNumber(rawValue);
    if (value <= 0) return false;

    const operations = readOperations();
    const currentId = currentOperationId();
    const operation = operations.find(op => op.id === currentId) || operations[0];
    if (!operation) return false;

    operation[key] = value;
    operation.renovationPerSqm = RENOVATION_RATE;
    operation.renovationItems = [];
    operation.updatedAt = new Date().toISOString();
    writeOperations(operations);
    localStorage.setItem(STORAGE.current, operation.id);

    window.dispatchEvent(new CustomEvent('polanco:update-operation', {
      detail: { key, value, source: 'mobile-executive-dashboard' }
    }));
    return true;
  }

  function bindActions() {
    document.getElementById('mobile-open-analyzer')?.addEventListener('click', () => {
      window.location.reload();
    });

    root.querySelectorAll('[data-operation-input]').forEach(input => {
      input.addEventListener('focus', () => input.select());
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') { event.preventDefault(); input.blur(); }
      });
      input.addEventListener('change', () => {
        if (saveField(input.dataset.operationInput, input.value, input.dataset.inputType)) {
          setTimeout(() => window.location.reload(), 50);
        }
      });
    });
  }

  function renderSummary() {
    injectStyles();
    root.querySelector('.mobile-command-center')?.remove();
    root.classList.remove('mobile-exec-ready');
    if (!isDashboard()) return;
    const operation = activeOperation();
    const result = operation ? calculate(operation) : null;
    root.insertAdjacentHTML('afterbegin', summaryHtml(operation, result));
    root.classList.add('mobile-exec-ready');
    bindActions();
  }

  let timer;
  function schedule(delay = 80) {
    clearTimeout(timer);
    timer = setTimeout(renderSummary, delay);
  }

  const observer = new MutationObserver(() => schedule(100));
  observer.observe(root, { childList: true });
  document.addEventListener('click', event => {
    if (event.target.closest('.nav-item,.primary-btn,.secondary-btn,[data-edit],[data-go]')) schedule(140);
  }, true);
  document.getElementById('current-operation')?.addEventListener('change', () => schedule(120));
  window.addEventListener('storage', () => schedule(100));
  setTimeout(() => schedule(0), 0);
})();