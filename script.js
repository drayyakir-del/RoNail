/* ===== לוגיקת וידג'ט הנגישות ===== */
(function(){
  var KEY='ronail_a11y_v1';
  var TEXTS=[100,115,130,150], LINES=[0,16,20], LINEVAL={0:'רגיל',16:'1.6',20:'2.0'};
  var LABELS={links:'הדגשת קישורים',contrast:'ניגודיות גבוהה',readable:'פונט קריא',headings:'הדגשת כותרות',motion:'עצירת אנימציות'};
  var DEF={version:1,links:false,contrast:false,textSize:100,lines:0,readable:false,headings:false,motion:false};
  var root=document.documentElement, trigger=document.getElementById('a11y-trigger'),
      panel=document.getElementById('a11y-panel'), live=document.getElementById('a11y-live');
  var prefs=load();
  function load(){try{var p=JSON.parse(localStorage.getItem(KEY)||'{}');return p.version===1?Object.assign({},DEF,p):Object.assign({},DEF);}catch(e){return Object.assign({},DEF);}}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(prefs));}catch(e){}}
  function apply(){var c=root.classList;
    c.toggle('a11y-links',prefs.links);
    c.toggle('a11y-contrast-high',prefs.contrast);
    c.toggle('a11y-text-115',prefs.textSize===115);
    c.toggle('a11y-text-130',prefs.textSize===130);
    c.toggle('a11y-text-150',prefs.textSize===150);
    c.toggle('a11y-lines-16',prefs.lines===16);
    c.toggle('a11y-lines-20',prefs.lines===20);
    c.toggle('a11y-readable',prefs.readable);
    c.toggle('a11y-headings',prefs.headings);
    c.toggle('a11y-reduce-motion',prefs.motion);}
  function render(){document.querySelectorAll('.a11y-btn[data-a11y]').forEach(function(btn){
    var k=btn.getAttribute('data-a11y'), val=btn.querySelector('.a11y-val');
    if(k==='text'){btn.classList.toggle('on',prefs.textSize!==100);if(val)val.textContent=prefs.textSize+'%';btn.setAttribute('aria-label','גודל טקסט: '+prefs.textSize+'%');}
    else if(k==='lines'){btn.classList.toggle('on',prefs.lines!==0);if(val)val.textContent=LINEVAL[prefs.lines];btn.setAttribute('aria-label','מרווח שורות: '+LINEVAL[prefs.lines]);}
    else if(k!=='reset'){btn.setAttribute('aria-pressed',prefs[k]?'true':'false');}
  });}
  function announce(m){if(live){live.textContent='';setTimeout(function(){live.textContent=m;},60);}}
  function set(k){
    if(k==='text'){prefs.textSize=TEXTS[(TEXTS.indexOf(prefs.textSize)+1)%TEXTS.length];announce('גודל טקסט '+prefs.textSize+'%');}
    else if(k==='lines'){prefs.lines=LINES[(LINES.indexOf(prefs.lines)+1)%LINES.length];announce('מרווח שורות '+LINEVAL[prefs.lines]);}
    else{prefs[k]=!prefs[k];announce((prefs[k]?'הופעל: ':'בוטל: ')+(LABELS[k]||k));}
    save();apply();render();}
  function reset(){prefs=Object.assign({},DEF);save();apply();render();announce('כל הגדרות הנגישות אופסו');}
  function open(o){panel.classList.toggle('open',o);trigger.setAttribute('aria-expanded',o?'true':'false');
    if(o){var f=panel.querySelector('.a11y-btn');if(f)f.focus();}else{trigger.focus();}}
  trigger.addEventListener('click',function(){open(!panel.classList.contains('open'));});
  document.querySelectorAll('.a11y-btn[data-a11y]').forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-a11y'));});});
  document.querySelector('.a11y-reset').addEventListener('click',reset);
  document.addEventListener('keydown',function(e){
    if(e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&e.code==='KeyA'){e.preventDefault();open(!panel.classList.contains('open'));}
    else if(e.key==='Escape'&&panel.classList.contains('open')){open(false);}});
  document.addEventListener('click',function(e){
    if(panel.classList.contains('open')&&!panel.contains(e.target)&&!trigger.contains(e.target))open(false);});
  apply();render();
})();

  // floating petals
  const pc=document.getElementById('petals');
  for(let i=0;i<8;i++){
    const p=document.createElement('div');p.className='petal';
    p.style.left=Math.random()*100+'vw';
    p.style.animationDuration=(7+Math.random()*8)+'s';
    p.style.animationDelay=(Math.random()*8)+'s';
    p.style.transform='scale('+(.5+Math.random())+')';
    pc.appendChild(p);
  }
  // nav shrink
  addEventListener
  ('scroll',()=>{document.getElementById('nav')
  .classList.toggle('shrink',scrollY>40)});
  // burger menu — synced state, ARIA, scroll-lock, Esc to close
  const b=document.getElementById('burger')
  ,nl=document.getElementById('navlinks');
  function setMenu(open){
    nl.classList.toggle('open',open);
    b.classList.toggle('open',open);
    b.setAttribute('aria-expanded',open?'true':'false');
    b.setAttribute('aria-label',open?'סגירת תפריט':'פתיחת תפריט');
    document.body.style.overflow=open?'hidden':'';
  }
  b.onclick=()=>setMenu(!b.classList.contains('open'));
  nl.querySelectorAll('a').forEach(a=>a.onclick=()=>setMenu(false));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);});
  const works=[
    {file:'Work1.jpg',label:'ורוד אבקתי'},
    {file:'Work2.jpg',label:'נייל ארט פסטל'},
    {file:'Work3.jpg',label:"פרנץ' אדום"},
  ];
  const tiles=document.getElementById('tiles');
  works.forEach((w,i)=>{
    const t=document.createElement('div');
    t.className='tile reveal';
    t.setAttribute('data-label',w.label);
    const img=document.createElement('img');
    img.src='images/'+w.file;
    img.alt=w.label;
    img.loading='lazy';
    img.onerror=()=>img.remove(); // אם אין תמונה — נשאר הגרדיאנט
    t.appendChild(img);
    const pk=document.createElement('span');
    pk.className='peek';
    pk.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" '+
      'stroke="#7A3247" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+
      '<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>';
    t.appendChild(pk);
    tiles.appendChild(t);
  });

  // reveal on scroll (observer + scroll fallback so nothing ever stays hidden)
  const io=new IntersectionObserver
  (es=>es.forEach(e=>{if(e.isIntersecting)
    {e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:0,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  // safety net: reveal any element that is in view, even if the observer missed it
  function revealNear(){
    document.querySelectorAll('.reveal:not(.in)').forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.height>0 && r.top<innerHeight*0.92 && r.bottom>0) el.classList.add('in');
    });
  }
  addEventListener('scroll',revealNear,{passive:true});
  addEventListener('resize',revealNear);
  addEventListener('load',()=>{
    if(window.ScrollTrigger&&ScrollTrigger.refresh) ScrollTrigger.refresh();
    revealNear();
  });

  /* ============================================================
     Hero sparkles + interactive manicure try-on
     ============================================================ */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // floating sparkles around the hero headline
  if (!reduce){
    const hero=document.querySelector('.hero');
    if (hero){
      const spots=[[18,30],[80,26],[50,18]];
      spots.forEach(([x,y],i)=>{
        const sp=document.createElement('span');
        sp.className='hero-spark';
        const sz=4+Math.random()*5;
        sp.style.width=sp.style.height=sz+'px';
        sp.style.left=x+'%';sp.style.top=y+'%';
        sp.style.setProperty('--sd',(3+Math.random()*2.5)+'s');
        sp.style.setProperty('--sdl',(1.6+i*.4)+'s');
        hero.appendChild(sp);
      });
    }
  }

  // Interactive manicure try-on — pick a shade, the nails paint themselves.
  const hand=document.getElementById('tryonHand');
  if(hand){
    const fills=[...hand.querySelectorAll('.paint-fill')];
    const french=[...hand.querySelectorAll('.art-french')];
    const glitter=[...hand.querySelectorAll('.art-glitter')];
    const nameEl=document.getElementById('tryonName');
    const liveEl=document.getElementById('tryonLive');
    const btns=[...document.querySelectorAll('.swatch-btn')];
    const sparks=[...document.querySelectorAll('.tryon-spark')];
    btns.forEach(btn=>btn.addEventListener('click',()=>{
      const color=btn.dataset.color, name=btn.dataset.name, art=btn.dataset.art||'';
      btns.forEach(x=>x.setAttribute('aria-pressed',x===btn?'true':'false'));
      // restart the liquid pour: drop paint below the cuticle, recolor, rise again
      hand.classList.remove('painted');
      void hand.getBoundingClientRect();          // force reflow so the pour replays
      fills.forEach(p=>p.style.fill=color);
      french.forEach(el=>el.style.opacity=art==='french'?1:0);
      glitter.forEach(el=>el.style.opacity=art==='glitter'?1:0);
      hand.classList.add('painted');
      // shade name, gently
      nameEl.textContent=name;
      nameEl.classList.remove('show'); void nameEl.offsetWidth;
      nameEl.classList.add('show');
      // celebratory sparkles once the polish sets
      sparks.forEach((s,i)=>{
        s.classList.remove('pop'); void s.offsetWidth;
        s.style.animationDelay=(0.45+i*0.14)+'s';
        s.classList.add('pop');
      });
      // announce for screen readers
      liveEl.textContent='';
      setTimeout(()=>{liveEl.textContent='נבחר גוון: '+name;},60);
    }));
  }

  // Subtle hero parallax — transform-only via rAF, skipped for reduced motion.
  if (!reduce){
    const bg=document.querySelector('.hero-bg');
    const heroEl=document.querySelector('.hero');
    if (bg && heroEl){
      let ticking=false;
      function parallax(){
        ticking=false;
        const heroBottom=heroEl.offsetTop+heroEl.offsetHeight;
        if (scrollY<heroBottom) bg.style.transform='translateY('+(scrollY*0.16)+'px)';
      }
      addEventListener('scroll',()=>{
        if(!ticking){ticking=true;requestAnimationFrame(parallax);}
      },{passive:true});
    }
  }
