(function () {
  'use strict';

  const STORAGE_KEY = 'polanco_os_operations_v2';
  const CURRENT_KEY = 'polanco_os_current_v2';
  const root = document.getElementById('view-root');
  if (!root) return;

  const money = value => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(Number(value) || 0);

  const pct = value => new Intl.NumberFormat('es-ES', {
    style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(Number(value) || 0);

  function getOperation() {
    try {
      const operations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const currentId = document.getElementById('current-operation')?.value || localStorage.getItem(CURRENT_KEY);
      return operations.find(item => item.id === currentId) || operations[0] || null;
    } catch (_) {
      return null;
    }
  }

  function resultCard(label, value, helper, tone = '') {
    return `<div class="result-stat tax-stat ${tone}"><div><span>${label}</span><small>${helper}</small></div><strong>${value}</strong></div>`;
  }

  function enhance() {
    const dashboard = root.querySelector('.mobile-command-center');
    const financialGroup = dashboard?.querySelector('.financial-group');
    if (!dashboard || !financialGroup || dashboard.querySelector('.tax-breakdown-group')) return;

    const operation = getOperation();
    if (!operation || !window.PolancoEngine?.calculate) return;

    const result = window.PolancoEngine.calculate({
      ...operation,
      renovationPerSqm: 1100000,
      renovationItems: []
    });

    const taxRate = Number(result.operation?.incomeTaxPct ?? operation.incomeTaxPct ?? 0.35);
    const block = document.createElement('div');
    block.className = 'tax-breakdown-group';
    block.innerHTML = `
      <div class="tax-breakdown-title"><span>Antes y después de impuestos</span><small>La renta sí está descontada</small></div>
      ${resultCard('Margen antes de impuestos', pct(result.actual.grossMargin), 'Utilidad antes de renta / venta')}
      ${resultCard(`Impuesto de renta estimado (${pct(taxRate)})`, money(result.actual.incomeTax), 'Se descuenta de la utilidad antes de impuestos', 'tax')}
      ${resultCard('Margen después de impuestos', pct(result.actual.netMargin), 'Utilidad neta / venta', 'positive')}
    `;

    const oldMargin = [...financialGroup.querySelectorAll('.result-stat')].find(card =>
      card.querySelector('span')?.textContent?.trim() === 'Margen neto'
    );
    if (oldMargin) oldMargin.remove();

    const utilityCard = [...financialGroup.querySelectorAll('.result-stat')].find(card =>
      card.querySelector('span')?.textContent?.trim() === 'Utilidad neta'
    );
    const utilityHelper = utilityCard?.querySelector('small');
    if (utilityHelper) utilityHelper.textContent = 'Después de costes, ICA e impuesto de renta; sin financiación';

    financialGroup.insertBefore(block, utilityCard || financialGroup.firstChild);
  }

  const observer = new MutationObserver(() => {
    if (!root.querySelector('.tax-breakdown-group')) requestAnimationFrame(enhance);
  });
  observer.observe(root, { childList: true, subtree: true });

  window.addEventListener('storage', () => requestAnimationFrame(enhance));
  document.addEventListener('DOMContentLoaded', enhance);
  setTimeout(enhance, 150);
})();
