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

  function card(label, value, helper, tone = '') {
    return `<div class="result-stat ${tone}" data-tax-integrated="true"><div><span>${label}</span><small>${helper}</small></div><strong>${value}</strong></div>`;
  }

  function integrate() {
    const dashboard = root.querySelector('.mobile-command-center');
    const financialGroup = dashboard?.querySelector('.financial-group');
    if (!dashboard || !financialGroup || financialGroup.dataset.taxLayout === 'integrated') return;

    const operation = getOperation();
    if (!operation || !window.PolancoEngine?.calculate) return;

    const result = window.PolancoEngine.calculate({
      ...operation,
      renovationPerSqm: 1100000,
      renovationItems: []
    });

    const taxRate = Number(result.operation?.incomeTaxPct ?? operation.incomeTaxPct ?? 0.35);
    financialGroup.dataset.taxLayout = 'integrated';
    financialGroup.innerHTML = `
      ${card('Inversión total', money(result.breakdown.cashCost), 'Compra + reforma + costes')}
      ${card('Utilidad antes de impuestos', money(result.actual.grossProfitBeforeTax), 'Después de costes e ICA')}
      ${card(`Impuesto de renta (${pct(taxRate)})`, `−${money(result.actual.incomeTax)}`, 'Descontado sobre la utilidad positiva', 'tax')}
      ${card('Utilidad neta', money(result.actual.netProfit), 'Después de costes, ICA y renta', result.actual.netProfit >= 0 ? 'positive' : 'negative')}
      ${card('Margen antes de impuestos', pct(result.actual.grossMargin), 'Utilidad antes de renta / venta')}
      ${card('Margen después de impuestos', pct(result.actual.netMargin), 'Utilidad neta / venta', 'positive')}
      ${card('ROI del proyecto', pct(result.actual.roi), 'Utilidad neta / inversión')}
    `;

    if (!document.getElementById('tax-integrated-styles')) {
      const style = document.createElement('style');
      style.id = 'tax-integrated-styles';
      style.textContent = `
        @media(max-width:760px){
          .financial-group[data-tax-layout="integrated"]{display:grid;gap:6px}
          .financial-group[data-tax-layout="integrated"] .result-stat.tax{background:#f3f7fa;border-color:#ccd9e4}
          .financial-group[data-tax-layout="integrated"] .result-stat.tax strong{color:#667b91}
          .financial-group[data-tax-layout="integrated"] .result-stat.positive{background:#edf6fc;border-color:#bdd9ea}
          .financial-group[data-tax-layout="integrated"] .result-stat.positive strong{color:#2d6f9f}
        }
      `;
      document.head.appendChild(style);
    }
  }

  const observer = new MutationObserver(() => {
    const group = root.querySelector('.financial-group');
    if (group && group.dataset.taxLayout !== 'integrated') requestAnimationFrame(integrate);
  });
  observer.observe(root, { childList: true, subtree: true });

  window.addEventListener('storage', () => requestAnimationFrame(integrate));
  document.addEventListener('DOMContentLoaded', integrate);
  setTimeout(integrate, 150);
})();