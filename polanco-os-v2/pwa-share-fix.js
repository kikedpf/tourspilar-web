(function(){
  'use strict';
  const APP_URL='https://kikedpf.github.io/tourspilar-web/';
  const SHARE_TEXT=`Instala Polanco OS para analizar operaciones inmobiliarias y su financiación:\n${APP_URL}`;

  async function copyLink(button){
    try{
      await navigator.clipboard.writeText(APP_URL);
      if(button){
        const previous=button.textContent;
        button.textContent='Enlace copiado';
        setTimeout(()=>{button.textContent=previous;},1600);
      }
    }catch(_){
      window.prompt('Copia este enlace:',APP_URL);
    }
  }

  document.addEventListener('click',async event=>{
    const button=event.target.closest('[data-pwa-share]');
    if(!button)return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    try{
      if(navigator.share){
        await navigator.share({title:'Polanco OS',text:SHARE_TEXT,url:APP_URL});
      }else{
        await copyLink(button);
      }
    }catch(error){
      if(error?.name!=='AbortError')await copyLink(button);
    }
  },true);

  function relabel(){
    document.querySelectorAll('[data-pwa-share]').forEach(button=>{
      if(button.textContent.trim()==='Compartir')button.textContent='Compartir enlace';
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',relabel,{once:true});
  else relabel();
  new MutationObserver(relabel).observe(document.documentElement,{childList:true,subtree:true});
})();