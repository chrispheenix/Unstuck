/* UNSTUCK home redesign. Load AFTER the main script. Overrides views.home only. Remove the <script> tag to revert. */
(function(){
if(typeof views==='undefined')return;
const f=document.createElement('link');f.rel='stylesheet';f.href='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400&display=swap';document.head.appendChild(f);
const st=document.createElement('style');st.textContent=`
body:has(.hm)::before,body:has(.hm) #embers{display:none}
body:has(.hm){background:#0c0b0a}
#app:has(.hm){max-width:720px}
.hm{--cr:#EFE3CF;--or:#B4501F;--ln:rgba(205,125,65,.4);position:relative;color:var(--cr)}
.hm-mono{font-family:'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.16em;font-size:11px;text-transform:uppercase;line-height:1.7}
.grain{position:fixed;inset:0;pointer-events:none;opacity:.17;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.hm-stage{position:relative;margin:0 -20px;padding:26px 20px 26px;overflow:hidden}
.hm-bg{position:absolute;inset:0}.hm-bg svg{width:100%;height:100%;display:block}
.hm-stage::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0c0b0a 20%,rgba(12,11,10,.6) 55%,rgba(12,11,10,.1)),linear-gradient(0deg,#0c0b0a,transparent 30%)}
.hm-stage>*:not(.hm-bg){position:relative;z-index:1}
.hm-top{display:flex;justify-content:space-between;align-items:flex-start;color:#c9b99f}
.hm-logo{font:600 34px/1 'Barlow Condensed',Impact,sans-serif;letter-spacing:.24em;color:var(--cr);margin-bottom:12px}
.hm .rule{display:block;width:34px;height:1px;background:var(--or);margin:16px 0}
.hm h1{font:700 clamp(58px,19vw,104px)/.88 'Barlow Condensed',Impact,sans-serif;letter-spacing:.005em;margin:44px 0 0;color:var(--cr)}
.hm-cta{display:flex;align-items:center;width:100%;margin-top:4px;padding:19px 22px;border:1px solid rgba(240,170,110,.55);border-radius:10px;background:linear-gradient(180deg,#B9561F,#8C3A14);color:var(--cr);cursor:pointer;font:inherit;box-shadow:inset 0 0 40px rgba(0,0,0,.25),0 0 24px rgba(180,80,31,.25)}
.hm-cta:hover{filter:brightness(1.1)}
.hm-cta span{flex:1;text-align:center}.hm-cta b{display:block;font:500 18px 'IBM Plex Mono',monospace;letter-spacing:.32em}.hm-cta small{display:block;font:400 10px 'IBM Plex Mono',monospace;letter-spacing:.22em;margin-top:2px}.hm-cta em{font-style:normal;font-size:26px}
.hm-row{display:flex;align-items:center;gap:14px;margin:30px 0 14px}.hm-row i{flex:1;height:1px;background:var(--ln)}
.hm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media (max-width:359px){.hm-grid{grid-template-columns:1fr 1fr}}
.hm-card{position:relative;display:flex;flex-direction:column;justify-content:flex-end;aspect-ratio:1/1.18;min-height:150px;padding:10px;border:1px solid var(--ln);border-radius:8px;overflow:hidden;background:#12100e;color:var(--cr);text-align:left;cursor:pointer;font:inherit;transition:border-color .2s}
.hm-card:hover{border-color:#E08A4A}
.hm-card .img{position:absolute;inset:0}.hm-card .img svg{width:100%;height:100%;display:block}
.hm-card::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#0c0b0a 8%,rgba(12,11,10,.6) 42%,transparent 72%)}
.hm-card>*:not(.img){position:relative;z-index:1}
.hm-card .n{position:absolute;top:8px;right:10px;font-size:10px;color:#c9b99f}
.hm-card b{font:600 clamp(15px,4.4vw,19px)/1.05 'Barlow Condensed',Impact,sans-serif;letter-spacing:.08em}
.hm-card small{display:block;margin-top:5px;font-size:8.5px;letter-spacing:.1em;line-height:1.5;color:#b9a98f;padding-right:16px}
.hm-card em{position:absolute;right:9px;bottom:8px;font-style:normal;font-size:16px}
.hm-cta:focus-visible,.hm-card:focus-visible{outline:2px solid #D9A15C;outline-offset:3px}
.hm-foot{display:flex;justify-content:space-between;gap:10px;margin-top:26px;padding-top:14px;border-top:1px solid var(--ln);font-size:10px;color:#9a8b75}
`;document.head.appendChild(st);

const S1=i=>`<svg viewBox="0 0 120 70" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${i}</svg>`;
const bgc='<rect width="120" height="70" fill="#14100e"/>';
let pads='';const lit=[1,2,5,6,10];
for(let i=0;i<12;i++)pads+=`<rect x="${20+(i%4)*21}" y="${16+Math.floor(i/4)*14}" width="17" height="10" rx="1.5" fill="${lit.includes(i)?'#D8683A':'#3b312b'}"/>`;
const cols=['#5a3b2a','#2c2622','#7a4a2a','#3a2f27','#8a6a45','#241e1a','#6a3a2a'];let rec=bgc;
for(let i=0;i<22;i++){const h=40+((i*37)%24),x=4+i*5.2;rec+=`<rect x="${x}" y="${70-h}" width="4.2" height="${h}" fill="${cols[i%7]}"/><rect x="${x}" y="${70-h}" width="4.2" height="3" fill="#D9C7A6" fill-opacity=".5"/>`}
const ped=(x,c,s,l)=>`<rect x="${x}" y="10" width="42" height="58" rx="4" fill="${c}" stroke="${s}" stroke-width=".7"/><circle cx="${x+12}" cy="23" r="5" fill="#1c1512"/><circle cx="${x+30}" cy="23" r="5" fill="#1c1512"/><rect x="${x+8}" y="34" width="26" height="6" rx="1" fill="${l}"/><circle cx="${x+21}" cy="54" r="5.5" fill="#cfc6b8"/>`;
const IMG={
ideas:S1(`<defs><radialGradient id="ga"><stop offset="0" stop-color="#E8A04A" stop-opacity=".8"/><stop offset="1" stop-color="#E8A04A" stop-opacity="0"/></radialGradient></defs>${bgc}<circle cx="60" cy="30" r="34" fill="url(#ga)"/><path d="M52 44c-6-5-8-9-8-14a16 16 0 0 1 32 0c0 5-2 9-8 14z" fill="#F3C57A" fill-opacity=".25" stroke="#F0D9A8"/><path d="M55 44l2-14 3 6 3-6 2 14" fill="none" stroke="#FFB44D" stroke-width="1.4"/><rect x="53" y="44" width="14" height="8" rx="1.5" fill="#3b332d"/>`),
beat:S1(`${bgc}<rect x="10" y="6" width="100" height="70" rx="5" fill="#241d19" stroke="#41362e"/><circle cx="20" cy="11" r="2.5" fill="#6b5c4e"/><circle cx="29" cy="11" r="2.5" fill="#6b5c4e"/>${pads}`),
energy:S1(`${bgc}<path d="M20 58C34 66 50 60 56 44" fill="none" stroke="#D9CCB4" stroke-width="2.4" stroke-linecap="round"/><rect x="14" y="52" width="11" height="9" rx="2" fill="#bdb09a" transform="rotate(-20 19 56)"/><rect x="56" y="22" width="34" height="30" rx="5" fill="#DCD2BF"/><rect x="90" y="30" width="7" height="3" fill="#8a7f6e"/><rect x="90" y="41" width="7" height="3" fill="#8a7f6e"/><rect x="62" y="28" width="10" height="3" rx="1.5" fill="#fff" opacity=".4"/>`),
finish:S1(`${bgc}<polygon points="38,40 48,20 66,14 84,22 90,42 78,58 56,60" fill="#D8C7A8"/><polygon points="48,20 66,14 60,34" fill="#EFE3CF" opacity=".85"/><polygon points="66,14 84,22 72,36" fill="#B9A687"/><polygon points="60,34 72,36 56,60" fill="#C9B692"/><polygon points="38,40 60,34 56,60" fill="#A8957A"/><polygon points="84,22 90,42 72,36" fill="#E2D3B6"/><polygon points="90,42 78,58 72,36" fill="#9C8A70"/>`),
growth:S1(rec),
flip:S1(`${bgc}${ped(14,'#A6342B','#d96a55','#EFE3CF')}${ped(64,'#2b2826','#5a524a','#B4501F')}`)};
const TAG={ideas:'SPARK NEW DIRECTIONS',beat:'BREAK PATTERNS FIND FLOW',energy:'RECHARGE YOUR DRIVE',finish:'OVERCOME ROADBLOCKS',growth:'BUILD SKILLS LEVEL UP',flip:'NEW PERSPECTIVES FRESH SOUNDS'};
const STUDIO=`<svg viewBox="0 0 400 320" preserveAspectRatio="xMaxYMid slice" aria-hidden="true"><defs><linearGradient id="gw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F2B574" stop-opacity=".8"/><stop offset="1" stop-color="#F2B574" stop-opacity=".1"/></linearGradient></defs><rect width="400" height="320" fill="#120e0c"/><polygon points="250,20 330,0 330,150 250,190" fill="url(#gw)"/><path d="M290 12v170M250 105l80-28" stroke="#120e0c" stroke-width="3"/><rect x="340" y="120" width="50" height="80" rx="3" fill="#1d1613"/><circle cx="365" cy="142" r="9" fill="#2a211c"/><circle cx="365" cy="175" r="13" fill="#2a211c"/><path d="M360 120c-20-30-10-60 14-70 4 26-2 50-14 70zM372 130c14-24 40-30 56-24-12 20-34 30-56 24z" fill="#1f2a1c" opacity=".85"/><rect x="230" y="232" width="170" height="14" fill="#241b16"/><rect x="250" y="216" width="150" height="16" fill="#d8cdb8" opacity=".5"/><path d="M300 310v-80c0-34 20-50 48-50l8 6c-14 6-18 22-18 44v80z" fill="#0b0908"/></svg>`;

views.home=()=>`<div class="hm"><div class="grain"></div>
<div class="hm-stage"><div class="hm-bg">${STUDIO}</div>
<header class="hm-top"><div><div class="hm-logo">UNSTUCK</div><div class="hm-mono">Creative<br>challenges<br>for producers</div></div><span class="hm-mono">by Pheenix</span></header>
<h1>STUCK?<br>REIGNITE<br>THE SPARK.</h1><i class="rule"></i>
<p class="hm-mono" style="margin:0">Short challenges.<br>Real progress.<br>More music.</p></div>
<button class="hm-cta" data-a="surprise"><span><b>SURPRISE ME</b><small>RANDOM CHALLENGE</small></span><em>&rarr;</em></button>
<div class="hm-row hm-mono"><span>Choose a focus</span><i></i><span>6 categories</span></div>
<div class="hm-grid">${CATS.map((c,i)=>`<button class="hm-card" data-a="cat" data-v="${c.id}"><div class="img">${IMG[c.id]}</div><span class="n hm-mono">0${i+1}</span><b>${c.name.toUpperCase()}</b><small class="hm-mono">${TAG[c.id]}</small><em>&rarr;</em></button>`).join('')}</div>
<footer class="hm-foot hm-mono"><span>Pheenix</span><span>${store.done.length} of ${C.length} challenges done</span></footer></div>`;
if(S.screen==='home')render();
})();
