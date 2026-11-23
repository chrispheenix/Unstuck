/* UNSTUCK starters (Supabase). Load AFTER home.js and photos.js. Needs the SQL setup to be run once in Supabase. */
(function(){
if(typeof views==='undefined')return;
const SB_URL='https://zmklkwndnsnlpgyymxoq.supabase.co',SB_KEY='sb_publishable_A7RyEbs3VOhwqerkHL7Iqg_7ol1Aq0V';
let sb=null,U=null,msg='',cur=null;
const el=id=>document.getElementById(id);
const M=t=>{msg=t;const e=el('msg');if(e)e.textContent=t};
const st=document.createElement('style');st.textContent=`
.sbx{margin-top:16px;border:1px dashed rgba(212,160,68,.4);border-radius:16px;padding:14px;font-size:13px;color:var(--mute)}
.sbx audio{width:100%;margin-top:10px}
.sbx .row2{display:flex;gap:8px;margin-top:10px}
.sbx button{flex:1;border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:12px;padding:10px;font:600 13px Manrope,sans-serif;cursor:pointer}
.fld{width:100%;padding:14px;margin-top:10px;border-radius:12px;border:1px solid var(--line);background:#1d1816;color:var(--ink);font:inherit}
.note{color:var(--mute);font-size:13px;margin:10px 0}
.msg{color:var(--gold);min-height:22px;margin:12px 0 0;font-weight:600}
.lnk{background:none;border:0;color:#c9b99f;font:inherit;text-decoration:underline;cursor:pointer;letter-spacing:.12em;text-transform:uppercase;font-size:10px}
`;document.head.appendChild(st);

/* --- helpers: strip ID3 tags, check length --- */
async function clean(f){const b=new Uint8Array(await f.arrayBuffer());let s=0,e=b.length;
if(b[0]==73&&b[1]==68&&b[2]==51)s=10+((b[6]&127)<<21|(b[7]&127)<<14|(b[8]&127)<<7|(b[9]&127))+((b[5]&16)?10:0);
if(e-s>=128&&b[e-128]==84&&b[e-127]==65&&b[e-126]==71)e-=128;
return new Blob([b.slice(s,e)],{type:'audio/mpeg'})}
const dur=f=>new Promise(r=>{const a=new Audio(URL.createObjectURL(f));a.onloadedmetadata=()=>r(a.duration);a.onerror=()=>r(0)});

/* --- challenge screen: starter box --- */
const box=()=>`<div class="sbx" id="sbx">${U?'Starter ideas from other producers. The uploader stays anonymous.<div class="row2"><button data-s="rand">Play random starter</button></div>':'Log in to hear and download starter ideas from other producers.<div class="row2"><button data-s="acct">Log in / Sign up</button></div>'}</div>`;
async function rand(){const b=el('sbx');b.textContent='Loading...';
const {data}=await sb.rpc('random_starter');
const again='<div class="row2"><button data-s="rand">Try again</button></div>';
if(!data||!data.length){b.innerHTML='No starters available yet.'+again;return}
cur=data[0];
const {data:s}=await sb.storage.from('starters').createSignedUrl(cur.storage_path,600);
if(!s){b.innerHTML='Could not load the audio.'+again;return}
b.innerHTML=`<audio controls src="${s.signedUrl}"></audio><div class="row2"><button data-s="dl">Download</button><button data-s="rand">Another</button><button data-s="rep">Report</button></div>`}
async function dl(){const {data:n}=await sb.rpc('starter_original_name',{p_id:cur.id});
const {data:s}=await sb.storage.from('starters').createSignedUrl(cur.storage_path,60);
const r=await fetch(s.signedUrl),a=document.createElement('a');
a.href=URL.createObjectURL(await r.blob());a.download=n||'starter.mp3';a.click()}
async function rep(){const {error}=await sb.from('reports').insert({starter_id:cur.id});alert(error?'Could not send the report.':'Thanks, reported.')}

/* --- account + upload screen --- */
views.account=()=>brand+`<section class="screen"><button class="link" data-a="home">&larr; Back</button><h2>${U?'Your account':'Log in'}</h2>${U?`<p class="lead">${U.email}</p>
<h3 style="font-size:22px">Upload a starter idea</h3>
<p class="note">MP3 only, max 10 MB and 60 seconds. Your account stays hidden. Other users see the original file name only when they download it. Tags inside the file are removed. New uploads are reviewed first.</p>
<input class="fld" id="uf" type="file" accept=".mp3,audio/mpeg">
<label class="note" style="display:block"><input type="checkbox" id="ur"> I own the rights to this file and allow others to download and use it.</label>
<div class="stack"><button class="btn gold" data-s="up">Upload</button><button class="btn" data-s="out">Log out</button></div>`:`<p class="lead">Sign up to share and hear starter ideas.</p>
<input class="fld" id="em" type="email" placeholder="Email" autocomplete="email">
<input class="fld" id="pw" type="password" placeholder="Password (min. 8 characters)" autocomplete="current-password">
<div class="stack"><button class="btn gold" data-s="in">Log in</button><button class="btn" data-s="reg">Sign up</button></div>`}<p class="msg" id="msg">${msg}</p></section>`;

async function auth(reg){const e=el('em').value.trim(),p=el('pw').value;
if(!e||p.length<8)return M('Enter an email and a password with at least 8 characters.');
M('Please wait...');
const r=reg?await sb.auth.signUp({email:e,password:p,options:{emailRedirectTo:location.origin+location.pathname}}):await sb.auth.signInWithPassword({email:e,password:p});
if(r.error)return M(r.error.message);
if(reg&&!r.data.session)M('Check your inbox, confirm your email, then log in.')}
async function up(){const f=el('uf').files[0];
if(!f)return M('Choose an MP3 file.');
if(!el('ur').checked)return M('Please confirm that you own the rights.');
if(!/\.mp3$/i.test(f.name)||f.size>10485760)return M('MP3 only, max 10 MB.');
M('Uploading...');
const d=await dur(f);if(!d||d>60)return M('The file must be 60 seconds or shorter.');
const blob=await clean(f),path=crypto.randomUUID()+'.mp3';
const u=await sb.storage.from('starters').upload(path,blob,{contentType:'audio/mpeg'});
if(u.error)return M(u.error.message);
const i=await sb.from('starters').insert({storage_path:path,original_name:f.name,rights_confirmed:true});
if(i.error){await sb.storage.from('starters').remove([path]);return M(i.error.message)}
M('Uploaded. It becomes visible to others after review.')}

document.getElementById('app').addEventListener('click',e=>{
  const b=e.target.closest('[data-s]');if(!b||!sb)return;const a=b.dataset.s;
  if(a==='acct'){msg='';go('account')}
  else if(a==='in')auth(0);else if(a==='reg')auth(1);
  else if(a==='out')sb.auth.signOut();else if(a==='up')up();
  else if(a==='rand')rand();else if(a==='dl')dl();else if(a==='rep')rep();
});

/* --- hook into existing screens --- */
const oh=views.home;
views.home=()=>oh().replace('<footer class="hm-foot hm-mono"><span>Pheenix</span>','<footer class="hm-foot hm-mono"><span>Pheenix</span><button class="lnk" data-s="acct">'+(U?'Account':'Log in')+'</button>');
const oc=views.challenge;
views.challenge=()=>oc().replace(/<div class="ph">[\s\S]*?<\/div><\/div>/,box());

/* --- load Supabase client --- */
const sc=document.createElement('script');sc.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
sc.onload=()=>{sb=window.supabase.createClient(SB_URL,SB_KEY);
  sb.auth.getSession().then(({data})=>{U=data.session?data.session.user:null;if(S.screen==='home')render()});
  sb.auth.onAuthStateChange((_,s)=>{U=s?s.user:null;msg='';if(S.screen==='account')render()})};
document.head.appendChild(sc);
})();
