(function () {
  'use strict';

  const STORAGE = {
    operations: 'polanco_os_operations_v2',
    current: 'polanco_os_current_v2'
  };

  const root = document.getElementById('view-root');
  if (!root) return;

  const money = value => new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

  const integer = value => new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0
  }).format(Number(value) || 0);

  const pct = value => new Intl.NumberFormat('es-ES', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value) || 0);

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));

  const parseMoney = value => Math.max(0, Number(String(value ?? '').replace(/[^0-9]/g, '')) || 0);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));

  function readOperations() {
    try {
      const operations = JSON.parse(localStorage.getItem(STORAGE.operations) || '[]');
      return Array.isArray(operations) ? operations : [];
    } catch (_) {
      return [];
    }
  }

  function activeOperation() {
    const operations = readOperations();
    const selected = document.getElementById('current-operation')?.value;
    const currentId = selected || localStorage.getItem(STORAGE.current);
    return operations.find(operation => operation.id === currentId) || operations[0] || null;
  }

  function isDashboard() {
    return document.querySelector('.nav-item.active')?.dataset?.view === 'dashboard' ||
      document.getElementById('page-title')?.textContent?.trim() === 'Panel ejecutivo';
  }

  function calculate(operation) {
    try {
      return window.PolancoEngine?.calculate(operation) || null;
    } catch (error) {
      console.error('No se pudo calcular el dashboard móvil', error);
      return null;
    }
  }

  function signedMoney(value) {
    const amount = Number(value) || 0;
    if (amount > 0) return `+${money(amount)}`;
    if (amount < 0) return `−${money(Math.abs(amount))}`;
    return money(0);
  }

  function decisionDetail(room, pass) {
    const amount = Math.abs(Number(room) || 0);
    if (room >= 0) return `Tienes ${money(amount)} de colchón frente al máximo.`;
    if (!pass) return `Estás ${money(amount)} por encima del precio máximo.`;
    return 'La operación necesita una revisión adicional.';
  }

  function actionText(operation, result) {
    if (operation.nextAction?.trim()) return operation.nextAction.trim();
    const room = Number(result?.actual?.roomVsMax) || 0;
    if (room < 0) return 'Bajar compra, subir venta o recortar reforma antes de ofertar.';
    if ((Number(result?.comparables?.count) || 0) < 5) return 'Validar cierres reales antes de presentar oferta.';
    return 'Validar cierres reales y presentar oferta.';
  }

  function metric(label, value, helper, tone = '') {
    return `<div class="exec-metric ${tone}">
      <div><span>${esc(label)}</span><small>${esc(helper)}</small></div>
      <strong>${esc(value)}</strong>
    </div>`;
  }

  function editablePrice(key, label, value, helper, tone) {
    return `<div class="exec-metric exec-editable ${tone}">
      <div><span>${esc(label)}</span><small>${esc(helper)}</small></div>
      <label class="exec-price-input ${tone}">
        <b>$</b>
        <input data-price-input="${esc(key)}" type="text" inputmode="numeric" autocomplete="off" value="${esc(integer(value))}" aria-label="${esc(label)}">
        <em>COP</em>
      </label>
    </div>`;
  }

  function summaryHtml(operation, result) {
    if (!operation || !result) {
      return `<section class="mobile-command-center">
        <div class="exec-empty">
          <strong>Sin operación activa</strong>
          <span>Crea o selecciona una operación para ver la pantalla de decisión.</span>
        </div>
      </section>`;
    }

    const pass = result.actual.decision === 'PASA';
    const room = Number(result.actual.roomVsMax) || 0;
    const score = clamp(result.score?.total, 0, 100);
    const salePrice = Number(operation.salePrice) || 0;
    const purchasePrice = Number(operation.purchasePrice) || 0;
    const area = Number(operation.area) || 0;
    const renovationPerSqm = Number(operation.renovationPerSqm) || 0;
    const targetMargin = Number(result.operation?.targetMargin ?? operation.targetMargin) || 0;

    return `<section class="mobile-command-center" aria-label="Dashboard ejecutivo móvil">
      <div class="exec-topline">
        <div class="exec-kicker"><i></i><span>Dashboard ejecutivo · Flipping Bogotá VIS</span></div>
        <button type="button" id="mobile-open-analyzer" class="exec-open-btn">Abrir ficha</button>
      </div>

      <article class="exec-decision ${pass ? 'pass' : 'fail'}">
        <div class="exec-decision-copy">
          <span>${esc(operation.name || 'Operación activa')}</span>
          <h2>${esc(result.actual.decision)}</h2>
          <p>${esc(decisionDetail(room, pass))}</p>
        </div>
        <div class="exec-score">
          <strong>${integer(score)}</strong>
          <small>SCORE</small>
        </div>
      </article>

      <div class="exec-two-columns">
        <section class="exec-panel">
          <header><span>Calculadora rápida</span><small>Edita compra y venta</small></header>
          ${editablePrice('salePrice', 'Precio de venta esperado', salePrice, 'Salida probable según comparables', 'sale')}
          ${editablePrice('purchasePrice', 'Oferta / precio de compra', purchasePrice, 'Aquí se decide el negocio', 'buy')}
          ${metric('Área del inmueble', `${integer(area)} m²`, 'Variable para cada apartamento')}
          ${metric('Costo de reforma por m²', money(renovationPerSqm), 'Materiales y mano de obra')}
          ${metric('Margen bruto objetivo', pct(targetMargin), 'Antes de renta e intereses')}
        </section>

        <section class="exec-panel">
          <header><span>Resultado</span><small>Lo que decide la compra</small></header>
          ${metric('Precio máximo de compra', money(result.actual.maxPurchase), 'No deberías pagar más', 'good')}
          ${metric('Margen frente al máximo', signedMoney(room), room >= 0 ? 'Colchón disponible' : 'Estás pagando de más', room >= 0 ? 'good' : 'bad')}
          ${metric('Inversión total', money(result.breakdown.cashCost), 'Compra + reforma + costes')}
          ${metric('Utilidad neta', money(result.actual.netProfit), 'Después de costes, sin deuda', result.actual.netProfit >= 0 ? 'good' : 'bad')}
          ${metric('Margen neto', pct(result.actual.netMargin), 'Utilidad neta / venta')}
          ${metric('Rentabilidad del proyecto', pct(result.actual.roi), 'Utilidad neta / inversión')}
        </section>
      </div>

      <article class="exec-action ${pass ? 'pass' : 'fail'}">
        <div><span>Decisión</span><strong>${esc(result.actual.decision)}</strong></div>
        <p>${esc(actionText(operation, result))}</p>
      </article>

      <button type="button" id="mobile-more-dashboard" class="exec-more-btn">
        <span>Ver cartera completa</span><b>⌄</b>
      </button>
    </section>`;
  }

  function injectStyles() {
    if (document.getElementById('mobile-executive-dashboard-styles')) return;
    const style = document.createElement('style');
    style.id = 'mobile-executive-dashboard-styles';
    style.textContent = `
      @media (min-width:761px){
        .mobile-command-center{display:none!important}
      }
      @media (max-width:760px){
        .mobile-command-center{display:grid!important;gap:8px;margin:0 0 12px!important}
        .exec-topline{display:flex;align-items:center;justify-content:space-between;gap:8px}
        .exec-kicker{display:flex;align-items:center;gap:7px;min-width:0;color:#68768a;font-size:9px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .exec-kicker i{width:8px;height:8px;flex:0 0 auto;border-radius:999px;background:#2da49d;box-shadow:0 0 0 5px rgba(45,164,157,.13)}
        .exec-kicker span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .exec-open-btn,.exec-more-btn{border:1px solid rgba(23,58,99,.17);background:#fff;color:#173A63;border-radius:13px;padding:8px 11px;font-size:11px;font-weight:900;box-shadow:0 5px 14px rgba(16,37,63,.07)}
        .exec-open-btn{white-space:nowrap}
        .exec-decision{display:flex;align-items:center;justify-content:space-between;gap:10px;border-radius:19px;padding:11px 13px;color:#fff;box-shadow:0 12px 24px rgba(16,37,63,.16)}
        .exec-decision.pass{background:linear-gradient(135deg,#174c43,#2e8b61 58%,#75bf8e)}
        .exec-decision.fail{background:linear-gradient(135deg,#592632,#963a4d 58%,#d67f70)}
        .exec-decision-copy{min-width:0}
        .exec-decision-copy>span{display:block;margin-bottom:3px;font-size:9px;font-weight:900;letter-spacing:.13em;text-transform:uppercase;opacity:.78;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .exec-decision-copy h2{margin:0;font-size:29px;line-height:1;font-weight:950;letter-spacing:-.04em}
        .exec-decision-copy p{margin:5px 0 0;font-size:11px;line-height:1.25;color:rgba(255,255,255,.91)}
        .exec-score{width:64px;height:64px;flex:0 0 auto;border-radius:999px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,28,47,.25);border:4px solid rgba(139,224,255,.68);box-shadow:inset 0 0 0 3px rgba(255,255,255,.12)}
        .exec-score strong{font-size:24px;line-height:1;font-weight:950}
        .exec-score small{margin-top:2px;font-size:7px;font-weight:900;letter-spacing:.14em}
        .exec-two-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:7px;align-items:start}
        .exec-panel{display:grid;gap:5px;min-width:0;padding:7px;border:1px solid rgba(23,58,99,.11);border-radius:17px;background:#fff;box-shadow:0 9px 20px rgba(16,37,63,.06)}
        .exec-panel header{display:grid;gap:1px;padding:1px 3px 4px}
        .exec-panel header span{font-size:9px;font-weight:950;letter-spacing:.11em;text-transform:uppercase;color:#315c88}
        .exec-panel header small{font-size:8px;line-height:1.15;color:#8793a5}
        .exec-metric{display:grid;gap:3px;min-width:0;padding:6px 7px;border:1px solid #dde7f0;border-radius:11px;background:#f8fbfe}
        .exec-metric.good{border-color:#c9e5d3;background:#f3fbf6}
        .exec-metric.bad{border-color:#edc4ca;background:#fff5f6}
        .exec-metric>div{display:grid;gap:1px;min-width:0}
        .exec-metric span{font-size:7.8px;line-height:1.05;font-weight:950;letter-spacing:.055em;text-transform:uppercase;color:#657286}
        .exec-metric small{font-size:7.4px;line-height:1.1;color:#8a95a7}
        .exec-metric>strong{font-size:13.5px;line-height:1.05;font-weight:950;color:#17263c;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .exec-price-input{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:3px;padding:5px 6px;border:1px solid #d9e4ed;border-radius:9px;background:#fff;min-width:0}
        .exec-price-input.sale{border-color:#add5bd;background:#f2fbf5}
        .exec-price-input.buy{border-color:#dcc89f;background:#fffaf0}
        .exec-price-input b,.exec-price-input em{font-style:normal;font-size:8px;font-weight:950;color:#8994a5}
        .exec-price-input input{width:100%;min-width:0;border:0!important;background:transparent!important;outline:0!important;padding:0!important;margin:0!important;box-shadow:none!important;font-size:13px!important;line-height:1!important;font-weight:950!important;color:#173A63!important}
        .exec-price-input.sale input{color:#1a724d!important}
        .exec-price-input.buy input{color:#956419!important}
        .exec-action{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:10px;padding:9px 11px;border-radius:15px;color:#fff;box-shadow:0 8px 18px rgba(16,37,63,.13)}
        .exec-action.pass{background:linear-gradient(135deg,#173A63,#356ca6)}
        .exec-action.fail{background:linear-gradient(135deg,#5e2a38,#9f4558)}
        .exec-action>div{display:grid;gap:1px}
        .exec-action span{font-size:8px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;opacity:.8}
        .exec-action strong{font-size:18px;line-height:1;font-weight:950}
        .exec-action p{margin:0;font-size:10px;line-height:1.25;color:rgba(255,255,255,.92)}
        .exec-more-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:8px 11px}
        .exec-more-btn b{font-size:12px}
        .mobile-secondary-dashboard{display:none!important}
        #view-root.show-mobile-secondary .mobile-secondary-dashboard{display:block!important}
        .exec-empty{display:grid;gap:3px;padding:14px;border:1px solid rgba(23,58,99,.13);border-radius:17px;background:#fff;color:#627084}
        .exec-empty strong{color:#173A63}
        .exec-empty span{font-size:11px}
        html[data-theme="dark"] .exec-panel,html[data-theme="dark"] .exec-open-btn,html[data-theme="dark"] .exec-more-btn,html[data-theme="dark"] .exec-empty{background:#152235;border-color:#2a3b55;color:#e7eef8;box-shadow:none}
        html[data-theme="dark"] .exec-metric{background:#1a2940;border-color:#2b415e}
        html[data-theme="dark"] .exec-metric.good{background:#142c24;border-color:#28533f}
        html[data-theme="dark"] .exec-metric.bad{background:#351f29;border-color:#6e3747}
        html[data-theme="dark"] .exec-metric>strong,html[data-theme="dark"] .exec-price-input input{color:#f2f6fb!important}
        html[data-theme="dark"] .exec-price-input{background:#101b2b;border-color:#2b405d}
      }
    `;
    document.head.appendChild(style);
  }

  function markSecondaryContent() {
    [...root.children].forEach(child => {
      if (!child.classList.contains('mobile-command-center')) child.classList.add('mobile-secondary-dashboard');
    });
  }

  function commitPrice(key, value) {
    const price = parseMoney(value);
    const input = document.querySelector(`[data-price-input="${key}"]`);
    if (price <= 0) {
      input?.focus();
      return;
    }
    window.dispatchEvent(new CustomEvent('polanco:update-operation', {
      detail: { key, value: price, source: 'mobile-executive-dashboard' }
    }));
  }

  function bindPriceInput(input) {
    const key = input.dataset.priceInput;
    input.addEventListener('focus', () => input.select());
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        input.blur();
      }
    });
    input.addEventListener('change', () => commitPrice(key, input.value));
    input.addEventListener('blur', () => commitPrice(key, input.value));
  }

  function bindSummaryActions() {
    document.getElementById('mobile-open-analyzer')?.addEventListener('click', () => {
      document.querySelector('.nav-item[data-view="analyzer"]')?.click();
    });

    document.getElementById('mobile-more-dashboard')?.addEventListener('click', event => {
      const showing = root.classList.toggle('show-mobile-secondary');
      event.currentTarget.querySelector('span').textContent = showing ? 'Ocultar cartera completa' : 'Ver cartera completa';
      event.currentTarget.querySelector('b').textContent = showing ? '⌃' : '⌄';
    });

    document.querySelectorAll('[data-price-input]').forEach(bindPriceInput);
  }

  function renderSummary() {
    injectStyles();
    if (!isDashboard()) return;
    const operation = activeOperation();
    const result = operation ? calculate(operation) : null;
    root.classList.remove('show-mobile-secondary');
    root.querySelector('.mobile-command-center')?.remove();
    root.insertAdjacentHTML('afterbegin', summaryHtml(operation, result));
    markSecondaryContent();
    bindSummaryActions();
  }

  let timer;
  function schedule(delay = 60) {
    clearTimeout(timer);
    timer = setTimeout(renderSummary, delay);
  }

  function isOwnSummaryMutation(mutation) {
    const nodes = [...mutation.addedNodes, ...mutation.removedNodes]
      .filter(node => node.nodeType === Node.ELEMENT_NODE);
    return nodes.length > 0 && nodes.every(node => node.classList?.contains('mobile-command-center'));
  }

  const observer = new MutationObserver(mutations => {
    if (mutations.length && mutations.every(isOwnSummaryMutation)) return;
    schedule();
  });
  observer.observe(root, { childList: true });

  document.addEventListener('click', event => {
    if (event.target.closest('.nav-item,.primary-btn,.secondary-btn,[data-edit],[data-go]')) schedule(110);
  });
  document.getElementById('current-operation')?.addEventListener('change', () => schedule(100));
  window.addEventListener('storage', () => schedule(80));
  window.addEventListener('polanco:update-operation', () => schedule(160));
  setTimeout(() => schedule(0), 0);
})();