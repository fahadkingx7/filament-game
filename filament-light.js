
/* FILAMENT / SINGLE LIGHTWEIGHT ATMOSPHERE */
(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
let fps=30, last=0, visible=!document.hidden;document.addEventListener('visibilitychange',()=>{visible=!document.hidden});
function init(){if(reduced)return;const targets=[...document.querySelectorAll('.hero-main,.world-hero,.filament-cinema')];if(!targets.length)return;
const instances=[];for(const el of targets){if(getComputedStyle(el).position==='static')el.style.position='relative';const holder=document.createElement('div');holder.className='optimized-rain';holder.dataset.intensity='storm';const canvas=document.createElement('canvas');holder.append(canvas);el.append(holder);const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)continue;
const count=innerWidth<700?45:95;const drops=Array.from({length:count},()=>({x:Math.random(),y:Math.random(),z:.3+Math.random()*.7}));instances.push({el,holder,canvas,ctx,drops,width:1,height:1,intensity:1});
}
if(!instances.length)return;function resize(o){const rect=o.el.getBoundingClientRect(),w=Math.max(1,Math.floor(rect.width*.65)),h=Math.max(1,Math.floor(rect.height*.65));if(o.canvas.width!==w||o.canvas.height!==h){o.canvas.width=w;o.canvas.height=h}o.width=w;o.height=h}
function tick(now){requestAnimationFrame(tick);if(!visible||now-last<1000/fps)return;const dt=Math.min((now-last)||33,70)/1000;last=now;for(const o of instances){if(o.intensity===0)continue;const rect=o.el.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)continue;resize(o);const c=o.ctx,w=o.width,h=o.height;c.clearRect(0,0,w,h);c.lineWidth=.75;c.strokeStyle='rgba(198,230,155,.27)';c.beginPath();for(const p of o.drops){const x=p.x*w,y=p.y*h,len=(7+p.z*15)*o.intensity;c.moveTo(x,y);c.lineTo(x+len*.3,y+len);p.y+=(dt*(.38+p.z*.75)*o.intensity);p.x+=(dt*.12*o.intensity);if(p.y>1.1){p.y=-.08;p.x=Math.random()}if(p.x>1.1)p.x=-.05}c.stroke();}}
requestAnimationFrame(tick);
const hero=document.querySelector('.hero-main');if(hero){const target=instances.find(o=>o.el===hero);if(target){const panel=document.createElement('div');panel.className='optimized-rain-control';panel.innerHTML='<span>ATMOSPHERE / ACID RAIN</span><button type="button" data-rain-level="0">OFF</button><button type="button" data-rain-level="1" aria-pressed="true">RAIN</button><button type="button" data-rain-level="1.8">STORM</button>';hero.append(panel);panel.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{const intensity=Number(button.dataset.rainLevel);target.intensity=intensity;target.holder.dataset.intensity=intensity?'storm':'off';panel.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button))) }));}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
