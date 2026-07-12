(async function(){
  const parts=['app.part01.txt','app.part02.txt','app.part03.txt','app.part04.txt','app.part05.txt','app.part06.txt','app.part07.txt','app.part08.txt','app.part09.txt'];
  const root=document.getElementById('view-root');
  try{
    const source=(await Promise.all(parts.map(async file=>{
      const response=await fetch(`${file}?v=460`,{cache:'no-store'});
      if(!response.ok)throw new Error(file);
      return response.text();
    }))).join('');
    (0,eval)(source);
    window.__POLANCO_APP_READY__=true;
    window.dispatchEvent(new CustomEvent('polanco:app-ready'));
  }catch(error){
    if(root)root.innerHTML='<div class="card"><h2>No se pudo cargar Polanco OS</h2><p>Recarga la página con conexión. Detalle: '+String(error)+'</p></div>';
    window.dispatchEvent(new CustomEvent('polanco:app-error',{detail:String(error)}));
  }
})();