import{_ as k,A as T,r as n,n as b,K as B,o as d,c as p,f as c,w as u,s as w,T as g,g as M,L as v,k as i,B as C,d as _,z as P,b as q}from"./index-fCEgyX7s.js";function K(t){return t?new Date(t.split("/").reverse().join("-")+"T00:00:00"):new Date}function N(t){return t?new Date(t).toISOString().split("T")[0].split("-").reverse().join("/"):""}const F={class:"modalWrapper"},A={class:"modalHeader"},D={__name:"Modal",setup(t,{expose:f}){T(e=>({"1dd2305a":y.value}));const s=n(!1),r=b("Message").value,a=n(),m=n();n();const y=B(()=>{var l,h;let e=(l=a.value)==null?void 0:l.querySelector(".modalHeader").children.length,o=(h=a.value)==null?void 0:h.querySelector(".modalFooter").children.length;return`${e?"51px":"17px"} 17px ${o?"69px":"17px"} 17px`});function $(){r.closeAll(),document.body.click(),s.value=!0,setTimeout(()=>{x()},0),setTimeout(()=>{let e=a.value.querySelector("section input","section textarea","section select","section button");e?e.focus():a.value.focus()},200)}function x(){var e;Array.from((e=m.value)==null?void 0:e.children).forEach(o=>{o.style.flex="1"})}function S(){r.closeAll(),document.body.click(),s.value=!1}return f({show:$,close:S}),(e,o)=>(d(),p("div",F,[c(g,{name:"fade"},{default:u(()=>[s.value?(d(),p("div",{key:0,class:"modalShadow",onClick:o[0]||(o[0]=l=>e.$emit("close"))})):w("",!0)]),_:1}),c(g,{name:"grow"},{default:u(()=>[s.value?(d(),p("div",{key:0,class:"modal",ref_key:"modal",ref:a,onKeydown:o[2]||(o[2]=M(l=>e.$emit("close"),["escape"])),tabindex:"0"},[i("header",A,[v(e.$slots,"header",{},void 0,!0)]),i("section",null,[v(e.$slots,"default",{},void 0,!0)]),i("footer",{class:"modalFooter",ref_key:"modalFooter",ref:m},[v(e.$slots,"footer",{},void 0,!0)],512),c(_(C),{class:"secondary closeModalBt",onClick:o[1]||(o[1]=l=>e.$emit("close"))},{default:u(()=>[c(_(P),{class:"x",size:1.5})]),_:1})],544)):w("",!0)]),_:3})]))}},I=k(D,[["__scopeId","data-v-d3274f2d"]]),V=["src","alt"],j={__name:"ProfilePictureModal",props:{src:{type:[String,null],required:!0},alt:{type:String,required:!0}},setup(t,{expose:f}){const s=n();function r(){s.value.show()}function a(){s.value.close()}return f({show:r}),(m,y)=>(d(),q(_(I),{ref_key:"modal",ref:s,onClose:a},{default:u(()=>[i("img",{src:t.src,alt:t.alt},null,8,V)]),_:1},512))}},z=k(j,[["__scopeId","data-v-27a9b2ab"]]);export{I as M,z as P,N as d,K as s};
