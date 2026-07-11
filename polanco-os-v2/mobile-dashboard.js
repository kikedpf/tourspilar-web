(function () {
  'use strict';

  const STORAGE = {
    operations: 'polanco_os_operations_v2',
    current: 'polanco_os_current_v2'
  };

  const root = document.getElementById('view-root');
  if (!root) return;

  const money = value => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(Number(value) || 0);
  const compact = value => {
    const n = Number(value) || 0;
    if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(2)} mil M`;
    if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(Math.abs(n) % 1e6 === 0 ? 0 : 1)} M`;
    return money(n);
  };
  const integer = value => new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(Number(value) || 0);
  const pct = value => new Intl.NumberFormat('es-ES', {
    style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(Number(value) || 0);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const parseMoney = value => Math.max(0, Number(String(value ?? '').replace(/[^0-9]/g, '')) || 0);

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
    return document.querySelector('.nav-item.active')?.dataset.view === 'dashboard' ||
      document.getElementById('page-title')?.textContent.trim() === 'Panel ejecutivo';
  }

  function calculate(operation) {
    try {
      return window.PolancoEngine?.calculate(operation) || null;
    } catch (error) {
      console.error('No se pudo calcular el resumen móvil', error);
      return null;
    }
  }

  function priceRow({ key, eyebrow, label, value, tone }) {
    return `<div class="mobile-price-row ${tone}">
      <div class="mobile-price-label"><span>${eyebrow}</span><strong>${label}</strong></div>
      <div class="mobile-price-editor">
        <button class="mobile-price-step" data-price-key="${key}" data-price-delta="-5000000" type="button" aria-label="Restar cinco millones">−5M</button>
        <label class="mobile-price-input">
          <span>$</span>
          <input id="mobile-${key}" data-price-input="${key}" type="text" inputmode="numeric" autocomplete="off" value="${esc(integer(value))}" aria-label="${label}">
          <em>COP</em>
        </label>
        <button class="mobile-price-step" data-price-key="${key}" data-price-delta="5000000" type="button" aria-label="Sumar cinco millones">+5M</button>
      </div>
    </div>`;
  }

  function summaryHtml(operation, result) {
    if (!operation || !result) {
      return `<section class="mobile-command-center">
        <div class="mobile-operation-bar"><div class="mobile-brand-kicker"><i></i>POLANCO DEAL LAB</div></div>
        <article class="mobile-decision-card fail"><div class="mobile-decision-copy"><span>OPERACIÓN ACTIVA</span><h2>Sin operación</h2><p>Crea o selecciona una operación para activar el cockpit.</p></div><div class="mobile-score-orbit"><div><strong>—</strong><small>SCORE</small></div></div></article>
      </section>`;
    }

    const pass = result.actual.decision === 'PASA';
    const room = Number(result.actual.roomVsMax) || 0;
    const score = clamp(result.score?.total, 0, 100);
    const comparableCount = Number(result.comparables?.count) || 0;
    const highRisk = (result.risks || []).find(risk => risk.severity === 'high');
    const salePrice = Number(operation.salePrice) || 0;
    const purchasePrice = Number(operation.purchasePrice) || 0;
    const spread = salePrice - purchasePrice;
    const pricePerSqm = operation.area ? salePrice / Number(operation.area) : 0;
    const purchasePerSqm = operation.area ? purchasePrice / Number(operation.area) : 0;
    const grossMargin = Number(result.actual.grossMargin) || 0;
    const targetMargin = Number(result.operation?.targetMargin ?? operation.targetMargin) || 0;
    const meterScale = Math.max(.25, targetMargin * 1.35, Math.max(0, grossMargin) * 1.15);
    const marginPosition = clamp((grossMargin / meterScale) * 100, 0, 100);
    const targetPosition = clamp((targetMargin / meterScale) * 100, 0, 100);

    let alert = 'La operación tiene margen, pero valida cierres reales antes de ofertar.';
    if (!pass && room < 0) alert = `Supera el precio máximo en ${money(Math.abs(room))}.`;
    else if (comparableCount < 5) alert = `Solo hay ${comparableCount} comparables válidos. La salida todavía no está demostrada.`;
    else if (highRisk) alert = highRisk.title || highRisk.detail || 'Existe un riesgo alto pendiente de resolver.';

    const decisionDetail = pass
      ? `Tienes ${money(Math.max(0, room))} de colchón frente al máximo.`
      : room < 0
        ? `La compra está ${money(Math.abs(room))} por encima del máximo.`
        : 'No alcanza el margen bruto objetivo.';

    const nextAction = operation.nextAction?.trim() || (pass
      ? 'Validar documentación, comparables y presupuesto antes de ofertar.'
      : 'Renegociar la compra o demostrar un precio de salida mayor.');

    return `<section class="mobile-command-center" aria-label="Cockpit financiero de la operación">
      <div class="mobile-operation-bar">
        <div class="mobile-brand-kicker"><i></i>POLANCO DEAL LAB</div>
        <span class="mobile-status-pill">${esc(operation.status || 'Detectado')}</span>
      </div>

      <article class="mobile-decision-card ${pass ? 'pass' : 'fail'}" style="--score:${score}">
        <div class="mobile-decision-glow"></div>
        <div class="mobile-decision-copy">
          <span>${esc(operation.name || 'Nueva operación')}</span>
          <div class="mobile-decision-line"><h2>${esc(result.actual.decision)}</h2><b>${pass ? 'LISTA PARA VALIDAR' : 'TOCA RENEGOCIAR'}</b></div>
          <p>${esc(decisionDetail)}</p>
        </div>
        <div class="mobile-score-orbit"><div><strong>${score}</strong><small>SCORE</small></div></div>
      </article>

      <article class="mobile-deal-card">
        <div class="mobile-deal-head">
          <div><span>ESTRUCTURA DEL DEAL</span><strong>Entrada ↔ Salida</strong></div>
          <small>EDITABLE EN VIVO</small>
        </div>
        ${priceRow({ key: 'purchasePrice', eyebrow: 'ENTRADA', label: 'Precio de compra', value: purchasePrice, tone: 'purchase' })}
        <div class="mobile-spread-bridge">
          <span></span><b>SPREAD BRUTO ${compact(spread)}</b><span></span>
        </div>
        ${priceRow({ key: 'salePrice', eyebrow: 'SALIDA', label: 'Precio de venta', value: salePrice, tone: 'sale' })}
        <div class="mobile-price-foot">
          <span>Compra por m² <strong>${compact(purchasePerSqm)}</strong></span>
          <span>Venta por m² <strong>${compact(pricePerSqm)}</strong></span>
        </div>
      </article>

      <div class="mobile-kpi-grid">
        <article class="mobile-kpi-max"><span>Precio máximo</span><strong>${compact(result.actual.maxPurchase)}</strong><small>${room >= 0 ? 'Tienes colchón' : 'La compra lo supera'}</small></article>
        <article class="mobile-kpi-invest"><span>Inversión total</span><strong>${compact(result.breakdown.cashCost)}</strong><small>Caja del proyecto</small></article>
        <article class="mobile-kpi-profit"><span>Utilidad neta</span><strong class="${result.actual.netProfit >= 0 ? 'positive' : 'negative'}">${compact(result.actual.netProfit)}</strong><small>Después de renta</small></article>
        <article class="mobile-kpi-roi"><span>ROI proyecto</span><strong class="${result.actual.roi >= 0 ? 'positive' : 'negative'}">${pct(result.actual.roi)}</strong><small>Utilidad / caja</small></article>
      </div>

      <article class="mobile-margin-visual ${pass ? 'pass' : 'fail'}" style="--margin-position:${marginPosition}%;--target-position:${targetPosition}%">
        <div class="mobile-meter-head"><span>MARGEN BRUTO REAL</span><strong>${pct(grossMargin)}</strong><small>Objetivo ${pct(targetMargin)}</small></div>
        <div class="mobile-meter-track"><span></span><i title="Objetivo"></i></div>
        <div class="mobile-meter-foot"><span>0%</span><b class="${room >= 0 ? 'positive' : 'negative'}">${room >= 0 ? '+' : '−'}${compact(Math.abs(room))} vs. máximo</b></div>
      </article>

      <article class="mobile-signal mobile-alert">
        <div class="mobile-signal-icon">!</div><div><span>ALERTA DE OPERACIÓN</span><strong>${esc(alert)}</strong></div>
      </article>
      <article class="mobile-signal mobile-action">
        <div class="mobile-signal-icon">→</div><div><span>SIGUIENTE MOVIMIENTO</span><strong>${esc(nextAction)}</strong></div>
        <button id="mobile-edit-operation" type="button">Abrir ficha</button>
      </article>
      <button class="mobile-more-btn" id="mobile-more-dashboard" type="button"><span>Ver cartera completa</span><b>⌄</b></button>
    </section>`;
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
      input?.classList.add('invalid');
      input?.focus();
      return;
    }
    window.dispatchEvent(new CustomEvent('polanco:update-operation', {
      detail: { key, value: price, source: 'mobile-cockpit' }
    }));
  }

  function bindPriceInput(input) {
    const key = input.dataset.priceInput;
    input.addEventListener('focus', () => {
      input.classList.remove('invalid');
      input.value = String(parseMoney(input.value));
      input.select();
    });
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        input.blur();
      }
    });
    input.addEventListener('change', () => commitPrice(key, input.value));
    input.addEventListener('blur', () => {
      if (document.body.contains(input)) input.value = integer(parseMoney(input.value));
    });
  }

  function bindSummaryActions() {
    document.getElementById('mobile-edit-operation')?.addEventListener('click', () => {
      document.querySelector('.nav-item[data-view="analyzer"]')?.click();
    });

    document.getElementById('mobile-more-dashboard')?.addEventListener('click', event => {
      const showing = root.classList.toggle('show-mobile-secondary');
      event.currentTarget.querySelector('span').textContent = showing ? 'Ocultar cartera completa' : 'Ver cartera completa';
      event.currentTarget.querySelector('b').textContent = showing ? '⌃' : '⌄';
    });

    document.querySelectorAll('[data-price-input]').forEach(bindPriceInput);

    document.querySelectorAll('[data-price-delta]').forEach(button => {
      button.addEventListener('click', () => {
        const key = button.dataset.priceKey;
        const current = parseMoney(document.querySelector(`[data-price-input="${key}"]`)?.value || activeOperation()?.[key]);
        commitPrice(key, Math.max(1000000, current + Number(button.dataset.priceDelta || 0)));
      });
    });
  }

  function renderSummary() {
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
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(renderSummary, 50);
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
    if (event.target.closest('.nav-item,.primary-btn,.secondary-btn,[data-edit],[data-go]')) setTimeout(schedule, 100);
  });
  document.getElementById('current-operation')?.addEventListener('change', () => setTimeout(schedule, 100));
  window.addEventListener('storage', schedule);
  setTimeout(schedule, 0);
})();