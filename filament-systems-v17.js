/* FILAMENT systems interactions — uses actual current DOM ids */
(()=>{'use strict';
function ready(){
 const crank=document.getElementById('crank-button');
 if(crank){
   const number=document.getElementById('charge-number');
   const fill=document.getElementById('battery-fill');
   const power=document.getElementById('power-level');
   const bulb=document.getElementById('bulb-state');
   const state=document.getElementById('console-state');
   const icon=document.getElementById('crank-icon');
   let charge=Number(number?.textContent?.trim())||24;
   function update(){
     if(number)number.textContent=String(Math.round(charge));
     if(fill){fill.style.width=charge+'%';fill.setAttribute('role','progressbar');fill.setAttribute('aria-label','Filament charge');fill.setAttribute('aria-valuemin','0');fill.setAttribute('aria-valuemax','100');fill.setAttribute('aria-valuenow',String(Math.round(charge)));}
     if(power)power.textContent=charge>=75?'HIGH':charge>=40?'MEDIUM':'LOW';
     if(bulb)bulb.textContent=charge>=70?'BRIGHT':charge>=35?'GLOWING':'DIM';
     if(state)state.textContent=charge>=100?'FULLY CHARGED':'GENERATING POWER';
     crank.setAttribute('aria-label','Turn the crank. Current charge '+Math.round(charge)+' percent');
   }
   crank.addEventListener('click',()=>{charge=Math.min(100,charge+12);update();if(icon){icon.classList.remove('crank-spin');void icon.offsetWidth;icon.classList.add('crank-spin');}});
   update();
 }
 const moths={
  luna:{number:'001',name:'LUNA MOTH',description:'A pale-winged creature associated with transparent handgun rounds. One of the fragile creatures waiting near the city’s lamps.',function:'FUNCTION / HANDGUN',image:'assets/gear-moths.webp'},
  rosy:{number:'002',name:'ROSY MAPLE MOTH',description:'A moth species associated with shotgun ammunition in the current systems concept.',function:'FUNCTION / SHOTGUN',image:'assets/gear-moths.webp'},
  tiger:{number:'003',name:'GARDEN TIGER MOTH',description:'A moth species associated with rifle ammunition in the current systems concept.',function:'FUNCTION / RIFLE',image:'assets/gear-moths.webp'},
  hummingbird:{number:'004',name:'HUMMINGBIRD MOTH',description:'A moth species associated with power assistance in the current systems concept.',function:'FUNCTION / POWER ASSISTANCE',image:'assets/gear-moths.webp'}
 };
 const tabs=[...document.querySelectorAll('button[data-moth]')];
 if(tabs.length){
  const panel=document.querySelector('.moth-display'),id=document.getElementById('moth-id'),name=document.getElementById('moth-name'),desc=document.getElementById('moth-description'),fn=document.getElementById('moth-function'),visual=document.getElementById('moth-visual');
  function choose(key){const record=moths[key];if(!record)return;tabs.forEach(b=>{const on=b.dataset.moth===key;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));});if(id)id.textContent=record.number;if(name)name.textContent=record.name;if(desc)desc.textContent=record.description;if(fn)fn.textContent=record.function;if(visual)visual.style.backgroundImage='linear-gradient(120deg,rgba(12,22,18,.26),rgba(32,58,46,.2)),url("'+record.image+'")';if(panel)panel.setAttribute('aria-label','Selected moth: '+record.name);}
  tabs.forEach(b=>{b.type='button';b.addEventListener('click',()=>choose(b.dataset.moth));});
  choose(tabs.find(b=>b.classList.contains('selected'))?.dataset.moth||'luna');
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
