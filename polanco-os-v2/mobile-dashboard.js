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
  const pct = value => new Intl.NumberFormat('es-ES', {
    style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(Number(value) || 0);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));

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

  function summaryHtml(operation, result) {
    if (!operation || !result) {
      return `<section class="mobile-command-center">
        <div class="mobile-operation-bar"><div><span>OPERACIÓN ACTIVA</span><strong>Sin operación</strong></div></div>
        <article class="mobile-decision-card fail"><div><span>DECISIÓN</span><h2>—</h2><p>Crea o selecciona una operación.</p></div><div class="mobile-decision-icon">?</div></article>
      </section>`;
    }

    const pass = result.actual.decision === 'PASA';
    const room = Number(result.actual.roomVsMax) || 0;
    const score = Number(result.score?.total) || 0;
    const comparableCount = Number(result.comparables?.count) || 0;
    const highRisk = (result.risks || []).find(risk => risk.severity === 'high');

    let alert = 'La operación tiene margen, pero valida cierres reales antes de ofertar.';
    if (!pass && room < 0) alert = `Supera el precio máximo en ${money(Math.abs(room))}.`;
    else if (comparableCount < 5) alert = `Solo hay ${comparableCount} comparables válidos. La salida todavía no está demostrada.`;
    else if (highRisk) alert = highRisk.title || highRisk.detail || 'Existe un riesgo alto pendiente de resolver.';

    const decisionDetail = pass
      ? `Tienes ${money(Math.max(0, room))} de colchón frente al máximo.`
      : room < 0
        ? `La oferta está ${money(Math.abs(room))} por encima del máximo.`
        : 'No alcanza el margen bruto objetivo.';

    const nextAction = operation.nextAction?.trim() || (pass
      ? 'Validar documentación, comparables y presupuesto antes de ofertar.'
      : 'Renegociar la compra o demostrar un precio de salida mayor.');

    return `<section class="mobile-command-center" aria-label="Resumen ejecutivo de la operación">
      <div class="mobile-operation-bar">
        <div><span>OPERACIÓN ACTIVA</span><strong>${esc(operation.name || 'Nueva operación')}</strong></div>
        <div class="mobile-score"><span>SCORE</span><strong>${score}/100</strong></div>
      </div>
      <article class="mobile-decision-card ${pass ? 'pass' : 'fail'}">
        <div><span>DECISIÓN</span><h2>${esc(result.actual.decision)}</h2><p>${esc(decisionDetail)}</p></div>
        <div class="mobile-decision-icon">${pass ? '✓' : '!'}</div>
      </article>
      <div class="mobile-kpi-grid">
        <article><span>Compra</span><strong>${compact(operation.purchasePrice)}</strong></article>
        <article class="mobile-kpi-max"><span>Precio máximo</span><strong>${compact(result.actual.maxPurchase)}</strong></article>
        <article><span>Utilidad neta</span><strong class="${result.actual.netProfit >= 0 ? 'positive' : 'negative'}">${compact(result.actual.netProfit)}</strong></article>
        <article><span>ROI proyecto</span><strong class="${result.actual.roi >= 0 ? 'positive' : 'negative'}">${pct(result.actual.roi)}</strong></article>
      </div>
      <div class="mobile-margin-strip">
        <span>Margen neto</span><strong>${pct(result.actual.netMargin)}</strong>
        <span class="${room >= 0 ? 'positive' : 'negative'}">${room >= 0 ? '+' : '−'}${compact(Math.abs(room))} vs. máximo</span>
      </div>
      <article class="mobile-signal mobile-alert">
        <div class="mobile-signal-icon">!</div><div><span>ATENCIÓN</span><strong>${esc(alert)}</strong></div>
      </article>
      <article class="mobile-signal mobile-action">
        <div class="mobile-signal-icon">→</div><div><span>SIGUIENTE MOVIMIENTO</span><strong>${esc(nextAction)}</strong></div>
        <button id="mobile-edit-operation" type="button">Editar</button>
      </article>
      <button class="mobile-more-btn" id="mobile-more-dashboard" type="button">Ver cartera completa</button>
    </section>`;
  }

  function markSecondaryContent() {
    [...root.children].forEach(child => {
      if (!child.classList.contains('mobile-command-center')) child.classList.add('mobile-secondary-dashboard');
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

    document.getElementById('mobile-edit-operation')?.addEventListener('click', () => {
      document.querySelector('.nav-item[data-view="analyzer"]')?.click();
    });
    document.getElementById('mobile-more-dashboard')?.addEventListener('click', event => {
      const showing = root.classList.toggle('show-mobile-secondary');
      event.currentTarget.textContent = showing ? 'Ocultar cartera completa' : 'Ver cartera completa';
    });
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
