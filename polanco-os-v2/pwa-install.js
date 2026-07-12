(function () {
  'use strict';

  const APP_URL = 'https://kikedpf.github.io/tourspilar-web/';
  const DISMISS_KEY = 'polanco_pwa_install_dismissed_until';
  let deferredPrompt = null;

  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  function dismissed() {
    return Number(localStorage.getItem(DISMISS_KEY) || 0) > Date.now();
  }

  function injectStyles() {
    if (document.getElementById('pwa-install-styles')) return;
    const style = document.createElement('style');
    style.id = 'pwa-install-styles';
    style.textContent = `
      .pwa-install-bar{position:fixed;left:10px;right:10px;bottom:calc(68px + env(safe-area-inset-bottom));z-index:120;display:flex;align-items:center;gap:10px;padding:11px 12px;border:1px solid rgba(78,154,209,.34);border-radius:17px;background:rgba(247,251,255,.97);box-shadow:0 16px 38px rgba(27,74,111,.2);backdrop-filter:blur(18px);color:#173a63}
      .pwa-install-bar[hidden]{display:none!important}.pwa-install-copy{display:grid;gap:2px;min-width:0;flex:1}.pwa-install-copy strong{font-size:12px}.pwa-install-copy span{font-size:9px;line-height:1.25;color:#6b7b94}.pwa-install-actions{display:flex;align-items:center;gap:6px;flex:none}.pwa-install-actions button{min-height:35px;border-radius:11px;padding:8px 10px;border:1px solid #b9d4e8;background:#fff;color:#2d6f9f;font-size:10px;font-weight:900}.pwa-install-actions .pwa-primary{border-color:#4e9ad1;background:linear-gradient(135deg,#58a8dc,#3f86c6);color:#fff}.pwa-install-close{width:28px!important;padding:0!important;border:0!important;background:transparent!important;color:#8090a4!important;font-size:17px!important}
      .pwa-modal{position:fixed;inset:0;z-index:140;display:grid;place-items:end center;padding:18px 12px calc(18px + env(safe-area-inset-bottom));background:rgba(10,30,50,.42);backdrop-filter:blur(5px)}.pwa-modal[hidden]{display:none!important}.pwa-modal-card{width:min(100%,430px);display:grid;gap:14px;padding:18px;border-radius:22px;background:#fff;box-shadow:0 24px 60px rgba(0,0,0,.28);color:#17233a}.pwa-modal-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.pwa-modal-head div{display:grid;gap:4px}.pwa-modal-head strong{font-size:18px;color:#2d6f9f}.pwa-modal-head span{font-size:11px;line-height:1.35;color:#6b7b94}.pwa-modal-close{border:0;background:#edf5fb;color:#2d6f9f;width:34px;height:34px;border-radius:11px;font-size:18px}.pwa-steps{display:grid;gap:9px}.pwa-step{display:grid;grid-template-columns:30px minmax(0,1fr);gap:10px;align-items:center;padding:10px;border-radius:14px;background:#f4f8fb;border:1px solid #dce8f1}.pwa-step b{display:grid;place-items:center;width:30px;height:30px;border-radius:10px;background:#e1f1fb;color:#2d6f9f;font-size:13px}.pwa-step span{font-size:11px;line-height:1.35;color:#4e6075}.pwa-modal-share{min-height:42px;border:0;border-radius:13px;background:linear-gradient(135deg,#58a8dc,#3f86c6);color:#fff;font-size:12px;font-weight:900}
      @media(min-width:701px){.pwa-install-bar{left:auto;right:20px;bottom:20px;max-width:470px}.pwa-modal{place-items:center}}
      @media(max-width:390px){.pwa-install-bar{align-items:flex-start}.pwa-install-actions{display:grid;grid-template-columns:1fr 1fr}.pwa-install-close{position:absolute;right:5px;top:3px}.pwa-install-copy{padding-right:18px}}
    `;
    document.head.appendChild(style);
  }

  function buildUI() {
    if (document.getElementById('pwa-install-bar')) return;

    const bar = document.createElement('section');
    bar.id = 'pwa-install-bar';
    bar.className = 'pwa-install-bar';
    bar.hidden = true;
    bar.setAttribute('aria-label', 'Instalar o compartir Polanco OS');
    bar.innerHTML = `
      <div class="pwa-install-copy">
        <strong>Instala Polanco OS</strong>
        <span>Úsala como una aplicación y compártela con tus socios.</span>
      </div>
      <div class="pwa-install-actions">
        <button type="button" class="pwa-primary" data-pwa-install>Instalar</button>
        <button type="button" data-pwa-share>Compartir</button>
      </div>
      <button type="button" class="pwa-install-close" data-pwa-dismiss aria-label="Cerrar">×</button>
    `;

    const modal = document.createElement('div');
    modal.id = 'pwa-install-modal';
    modal.className = 'pwa-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="pwa-modal-card" role="dialog" aria-modal="true" aria-labelledby="pwa-modal-title">
        <div class="pwa-modal-head">
          <div>
            <strong id="pwa-modal-title">Instalar Polanco OS</strong>
            <span id="pwa-modal-subtitle">Quedará en tu pantalla de inicio y abrirá como una app.</span>
          </div>
          <button type="button" class="pwa-modal-close" data-pwa-modal-close aria-label="Cerrar">×</button>
        </div>
        <div class="pwa-steps" id="pwa-install-steps"></div>
        <button type="button" class="pwa-modal-share" data-pwa-share>Compartir el enlace</button>
      </div>
    `;

    document.body.appendChild(bar);
    document.body.appendChild(modal);

    bar.addEventListener('click', handleClick);
    modal.addEventListener('click', handleClick);
    modal.addEventListener('click', event => {
      if (event.target === modal) closeModal();
    });
  }

  function setSteps() {
    const steps = document.getElementById('pwa-install-steps');
    if (!steps) return;
    if (isIOS()) {
      steps.innerHTML = `
        <div class="pwa-step"><b>1</b><span>Abre este enlace en <strong>Safari</strong>.</span></div>
        <div class="pwa-step"><b>2</b><span>Pulsa el botón <strong>Compartir</strong> de Safari.</span></div>
        <div class="pwa-step"><b>3</b><span>Elige <strong>Añadir a pantalla de inicio</strong>.</span></div>
        <div class="pwa-step"><b>4</b><span>Pulsa <strong>Añadir</strong>. Polanco OS aparecerá como cualquier otra app.</span></div>
      `;
    } else {
      steps.innerHTML = `
        <div class="pwa-step"><b>1</b><span>Abre el enlace en <strong>Chrome</strong>.</span></div>
        <div class="pwa-step"><b>2</b><span>Pulsa <strong>Instalar aplicación</strong> o abre el menú del navegador.</span></div>
        <div class="pwa-step"><b>3</b><span>Elige <strong>Instalar</strong> o <strong>Añadir a pantalla de inicio</strong>.</span></div>
      `;
    }
  }

  function openModal() {
    setSteps();
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.hidden = false;
  }

  function closeModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.hidden = true;
  }

  function showBar(force) {
    const bar = document.getElementById('pwa-install-bar');
    if (!bar || isStandalone()) return;
    if (!force && dismissed()) return;
    bar.hidden = false;
  }

  function hideBar() {
    const bar = document.getElementById('pwa-install-bar');
    if (bar) bar.hidden = true;
  }

  async function installApp() {
    if (isStandalone()) {
      hideBar();
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (choice?.outcome === 'accepted') hideBar();
      return;
    }
    openModal();
  }

  async function shareApp() {
    const data = {
      title: 'Polanco OS',
      text: 'Instala Polanco OS para analizar operaciones inmobiliarias y su financiación.',
      url: APP_URL
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(APP_URL);
      const buttons = document.querySelectorAll('[data-pwa-share]');
      buttons.forEach(button => {
        const previous = button.textContent;
        button.textContent = 'Enlace copiado';
        setTimeout(() => { button.textContent = previous; }, 1600);
      });
    } catch (_) {
      // El usuario puede cerrar la hoja de compartir sin que sea un error.
    }
  }

  function handleClick(event) {
    if (event.target.closest('[data-pwa-install]')) installApp();
    if (event.target.closest('[data-pwa-share]')) shareApp();
    if (event.target.closest('[data-pwa-modal-close]')) closeModal();
    if (event.target.closest('[data-pwa-dismiss]')) {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + 7 * 24 * 60 * 60 * 1000));
      hideBar();
    }
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    showBar(true);
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideBar();
    closeModal();
  });

  function init() {
    injectStyles();
    buildUI();
    if (!isStandalone()) setTimeout(() => showBar(false), 1300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();