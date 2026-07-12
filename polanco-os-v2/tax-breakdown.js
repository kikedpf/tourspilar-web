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

  function metric(label, value, helper, tone = '') {
    return `<div class="finance-metric ${tone}"><span>${label}</span><strong>${value}</strong><small>${helper}</small></div>`;
  }

  function mini(label, value, tone = '') {
    return `<div class="finance-mini ${tone}"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function integrate() {
    const dashboard = root.querySelector('.mobile-command-center');
    const financialGroup = dashboard?.querySelector('.financial-group');
    if (!dashboard || !financialGroup || financialGroup.dataset.taxLayout === 'executive') return;

    const operation = getOperation();
    if (!operation || !window.PolancoEngine?.calculate) return;

    const result = window.PolancoEngine.calculate({
      ...operation,
      renovationPerSqm: 1100000,
      renovationItems: []
    });

    const taxRate = Number(result.operation?.incomeTaxPct ?? operation.incomeTaxPct ?? 0.35);
    financialGroup.dataset.taxLayout = 'executive';
    financialGroup.innerHTML = `
      <section class="finance-overview">
        <div class="finance-overview-head">
          <span>Resultado financiero</span>
          <small>Antes y después de impuestos</small>
        </div>
        ${metric('Inversión total', money(result.breakdown.cashCost), 'Compra + reforma + costes')}
      </section>

      <section class="tax-waterfall" aria-label="Desglose de utilidad e impuestos">
        ${metric('Utilidad antes de impuestos', money(result.actual.grossProfitBeforeTax), 'Después de costes e ICA', 'gross')}
        <div class="tax-connector"><span>menos</span><i>↓</i></div>
        ${metric(`Impuesto de renta · ${pct(taxRate)}`, `−${money(result.actual.incomeTax)}`, 'Aplicado solo sobre utilidad positiva', 'tax')}
        <div class="tax-connector"><span>resultado</span><i>↓</i></div>
        ${metric('Utilidad neta', money(result.actual.netProfit), 'Después de costes, ICA y renta', result.actual.netProfit >= 0 ? 'net positive' : 'net negative')}
      </section>

      <section class="margin-summary" aria-label="Márgenes y rentabilidad">
        ${mini('Margen antes', pct(result.actual.grossMargin))}
        ${mini('Margen después', pct(result.actual.netMargin), 'highlight')}
        ${mini('ROI', pct(result.actual.roi))}
      </section>
    `;

    if (!document.getElementById('tax-executive-styles')) {
      const style = document.createElement('style');
      style.id = 'tax-executive-styles';
      style.textContent = `
        @media(max-width:760px){
          .financial-group[data-tax-layout="executive"]{display:grid;gap:8px}
          .finance-overview,.tax-waterfall{display:grid;gap:7px}
          .finance-overview-head{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;padding:0 2px}
          .finance-overview-head span{font-size:8px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;color:#4f7392}
          .finance-overview-head small{font-size:7.5px;color:#8fa0b1;text-align:right}
          .finance-metric{display:grid;gap:3px;padding:9px 10px;border-radius:14px;background:#f5f9fc;border:1px solid #d7e4ee}
          .finance-metric span{font-size:7.5px;font-weight:950;letter-spacing:.055em;text-transform:uppercase;color:#62748a}
          .finance-metric strong{font-size:15px;line-height:1.05;color:#1f3d57;font-weight:950}
          .finance-metric small{font-size:7.5px;line-height:1.15;color:#8b99aa}
          .finance-metric.gross{background:#eef6fc;border-color:#bdd8ea}
          .finance-metric.gross strong{color:#2f6f9d}
          .finance-metric.tax{background:#f4f7fa;border-style:dashed;border-color:#c9d5df}
          .finance-metric.tax strong{color:#697d91}
          .finance-metric.net{padding:11px;background:linear-gradient(145deg,#e6f3fb,#f4f9fd);border-color:#9ec9e4;box-shadow:0 7px 16px rgba(61,125,170,.10)}
          .finance-metric.net strong{font-size:18px;color:#245f8b}
          .finance-metric.net.negative{background:#f5f1f3;border-color:#d8c7cd}
          .finance-metric.net.negative strong{color:#7d5360}
          .tax-connector{height:14px;display:flex;align-items:center;justify-content:center;gap:5px;color:#9aa9b8}
          .tax-connector span{font-size:6.5px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
          .tax-connector i{font-style:normal;font-size:10px;line-height:1}
          .margin-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}
          .finance-mini{display:grid;gap:3px;padding:8px 5px;border-radius:12px;background:#edf5fb;border:1px solid #d1e2ee;text-align:center;min-width:0}
          .finance-mini span{font-size:6.5px;line-height:1.05;font-weight:950;text-transform:uppercase;color:#74869a}
          .finance-mini strong{font-size:12px;line-height:1;color:#315f83;white-space:nowrap}
          .finance-mini.highlight{background:#dfeffc;border-color:#a8cee7}
          .finance-mini.highlight strong{color:#245f8b;font-size:13px}
        }
      `;
      document.head.appendChild(style);
    }
  }

  const observer = new MutationObserver(() => {
    const group = root.querySelector('.financial-group');
    if (group && group.dataset.taxLayout !== 'executive') requestAnimationFrame(integrate);
  });
  observer.observe(root, { childList: true, subtree: true });

  window.addEventListener('storage', () => requestAnimationFrame(integrate));
  document.addEventListener('DOMContentLoaded', integrate);
  setTimeout(integrate, 150);
})();