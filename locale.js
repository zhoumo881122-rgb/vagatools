(function(){
const countries={CN:'zh',TW:'zh',HK:'zh',MO:'zh',JP:'ja',KR:'ko',ES:'es',MX:'es',AR:'es',CO:'es',CL:'es',PE:'es',FR:'fr',BE:'fr',CH:'fr',CA:'fr',MA:'fr',DZ:'fr'};
const supported=['zh','en','ja','ko','es','fr'];
const sel=document.getElementById('language-switch');if(!sel)return;
const choice=localStorage.getItem('vagatools-language');
sel.addEventListener('change',function(){localStorage.setItem('vagatools-language',this.options[this.selectedIndex].textContent==='Auto'?'':this.value.split('/')[0]);location.href=new URL(this.value,location.origin+'/').href});
if(choice)return;
const pathname=location.pathname.replace(/^\//,'');const parts=pathname.split('/');const current=supported.includes(parts[0])&&parts[0]!=='zh'?parts[0]:'zh';const tail=current==='zh'?pathname:parts.slice(1).join('/');
const browser=()=>{const codes=navigator.languages||[navigator.language||'en'];for(const code of codes){const base=code.toLowerCase().split('-')[0];if(supported.includes(base))return base}return'en'};
fetch('/geo',{headers:{'Accept':'application/json'}}).then(r=>r.ok&&r.headers.get('content-type')?.includes('application/json')?r.json():null).catch(()=>null).then(data=>{
if(localStorage.getItem('vagatools-language'))return;const lang=(data&&countries[data.country])||browser();if(lang===current)return;
const dest='/'+(lang==='zh'?'':lang+'/')+(tail||'index.html')+location.search+location.hash;
location.replace(dest);
});
})();