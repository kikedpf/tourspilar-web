(function(){
  'use strict';
  const root=document.getElementById('view-root');
  if(!root)return;
  const sync=()=>{
    const ready=Boolean(root.querySelector(':scope > .mobile-command-center'));
    root.classList.toggle('mobile-exec-ready',ready);
  };
  const observer=new MutationObserver(sync);
  observer.observe(root,{childList:true});
  document.addEventListener('click',event=>{
    if(event.target.closest('#mobile-more-dashboard'))setTimeout(sync,0);
  },true);
  sync();
})();
