import{_ as g,A as S,r,k as T,C as B,o as d,c as p,b as c,w as i,s as h,T as w,e as C,i as u,L as v,B as M,y as P,a as b}from"./index-DQIYcgEA.js";const q={class:"modalWrapper"},F={class:"modalHeader"},A={__name:"Modal",setup(t,{expose:f}){S(e=>({"03a606dc":_.value}));const s=r(!1),n=T("Message").value,a=r(),m=r();r();const _=B(()=>{var l,y;let e=(l=a.value)==null?void 0:l.querySelector(".modalHeader").children.length,o=(y=a.value)==null?void 0:y.querySelector(".modalFooter").children.length;return`${e?"51px":"17px"} 17px ${o?"69px":"17px"} 17px`});function k(){n.closeAll(),document.body.click(),s.value=!0,setTimeout(()=>{$()},0),setTimeout(()=>{let e=a.value.querySelector("section input","section textarea","section select","section button");e?e.focus():a.value.focus()},200)}function $(){var e;Array.from((e=m.value)==null?void 0:e.children).forEach(o=>{o.style.flex="1"})}function x(){n.closeAll(),document.body.click(),s.value=!1}return f({show:k,close:x}),(e,o)=>(d(),p("div",q,[c(w,{name:"fade"},{default:i(()=>[s.value?(d(),p("div",{key:0,class:"modalShadow",onClick:o[0]||(o[0]=l=>e.$emit("close"))})):h("",!0)]),_:1}),c(w,{name:"grow"},{default:i(()=>[s.value?(d(),p("div",{key:0,class:"modal",ref_key:"modal",ref:a,onKeydown:o[2]||(o[2]=C(l=>e.$emit("close"),["escape"])),tabindex:"0"},[u("header",F,[v(e.$slots,"header",{},void 0,!0)]),u("section",null,[v(e.$slots,"default",{},void 0,!0)]),u("footer",{class:"modalFooter",ref_key:"modalFooter",ref:m},[v(e.$slots,"footer",{},void 0,!0)],512),c(M,{class:"secondary closeModalBt",onClick:o[1]||(o[1]=l=>e.$emit("close"))},{default:i(()=>[c(P,{class:"x",size:1.5})]),_:1})],544)):h("",!0)]),_:3})]))}},D=g(A,[["__scopeId","data-v-67401c8c"]]),I=["src","alt"],V={__name:"ProfilePictureModal",props:{src:{type:[String,null],required:!0},alt:{type:String,required:!0}},setup(t,{expose:f}){const s=r();function n(){s.value.show()}function a(){s.value.close()}return f({show:n}),(m,_)=>(d(),b(D,{ref_key:"modal",ref:s,onClose:a},{default:i(()=>[u("img",{src:t.src,alt:t.alt},null,8,I)]),_:1},512))}},H=g(V,[["__scopeId","data-v-579c68d4"]]);function N(t){return t?new Date(t.split("/").reverse().join("-")+"T00:00:00"):new Date}function E(t){return t?new Date(t).toISOString().split("T")[0].split("-").reverse().join("/"):""}export{D as M,H as P,E as d,N as s};