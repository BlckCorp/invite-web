const ids=['days','hours','minutes','seconds'];
const pad=v=>String(v).padStart(2,'0');
function tick(){
  const date=document.body.dataset.date||'2026-08-06T18:00:00+03:00';
  const diff=new Date(date)-new Date();
  let d=0,h=0,m=0,s=0;
  if(diff>0){const t=Math.floor(diff/1000);d=Math.floor(t/86400);h=Math.floor(t/3600%24);m=Math.floor(t/60%60);s=t%60;}
  [d,h,m,s].forEach((v,i)=>{const el=document.getElementById(ids[i]);if(el)el.textContent=pad(v);});
}
tick();setInterval(tick,1000);
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const form=document.getElementById('rsvpForm'),toast=document.getElementById('toast');
if(form&&toast){form.addEventListener('submit',e=>{e.preventDefault();toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3200);form.reset();});}
let audioCtx=null,master=null,timer=null,playing=false;
const box=document.getElementById('musicBox'),play=document.getElementById('playBtn');
function note(freq,time,len,type='sine',gain=.055){const osc=audioCtx.createOscillator(),g=audioCtx.createGain();osc.type=type;osc.frequency.value=freq;g.gain.setValueAtTime(0,time);g.gain.linearRampToValueAtTime(gain,time+.02);g.gain.exponentialRampToValueAtTime(.001,time+len);osc.connect(g);g.connect(master);osc.start(time);osc.stop(time+len+.04)}
function beat(){const now=audioCtx.currentTime;const scale=(document.body.dataset.scale||'261.63,329.63,392,493.88,392,329.63,293.66,392').split(',').map(Number);scale.forEach((f,i)=>{note(f,now+i*.22,.18,'triangle',.045);note(f/2,now+i*.44,.34,'sine',.032)});note(scale[0]/2,now,.42,'sawtooth',.022);note(scale[2]/2,now+.88,.42,'sawtooth',.022);note(scale[1]/2,now+1.76,.42,'sawtooth',.022)}
if(play&&box){play.addEventListener('click',()=>{if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();master=audioCtx.createGain();master.gain.value=.42;master.connect(audioCtx.destination)}if(!playing){playing=true;box.classList.add('playing');play.textContent='Ⅱ';beat();timer=setInterval(beat,3520)}else{playing=false;box.classList.remove('playing');play.textContent='▶';clearInterval(timer)}});}