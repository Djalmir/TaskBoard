import{_ as ie,r as e,K as Le,k as fe,o as c,a as K,w as M,i as w,t as re,b as v,B as A,d as ue,I as ge,q as we,e as me,c as L,s as j,m as Ee,A as ye,D as le,l as be,v as Ce,x as ke,y as H,L as Se,M as he,T as Be,F as Q,C as J,N as Ie,z as S,u as $e,H as ae,G as Ve,p as ze,h as Oe,f as De,E as Me,n as qe,O as _e,P as Je}from"./index-BOENqZPx.js";import{t as G,U as Pe,P as We,a as je}from"./ProfileModal-D_sdGhjj.js";import{M as Ne}from"./date-CkqKRw61.js";const Ye={__name:"ListModal",emits:["listCreated","listRenamed"],setup(a,{expose:g,emit:y}){const f=e(),D=Le(),_=fe("Message").value,$=D.params.boardId,k=e(""),I=e(""),h=e(!1),l=y;function b(O){if(O){const{_id:P,name:W}=JSON.parse(JSON.stringify(O));k.value=P,I.value=W,h.value=!0}else h.value=!1;f.value.show()}function B(){G.createList({boardId:$,name:I.value}).then(O=>{l("listCreated",O.data),o()})}function E(){G.updateList({listId:k.value,name:I.value}).then(O=>{l("listRenamed",O.data),o()})}function o(){k.value="",I.value="",f.value.close()}return g({show:b}),(O,P)=>(c(),K(Ne,{ref_key:"modal",ref:f,onClose:o,onKeypress:P[2]||(P[2]=me(()=>h.value?E():B(),["enter"]))},{header:M(()=>[w("b",null,re(h.value?"Renomear":"Nova")+" Lista",1)]),footer:M(()=>[v(A,{class:"secondary",onClick:o},{default:M(()=>[ue("Cancelar")]),_:1}),h.value?(c(),K(A,{key:0,type:"submit",onClick:E},{default:M(()=>[ue("Atualizar")]),_:1})):(c(),K(A,{key:1,type:"submit",onClick:B},{default:M(()=>[ue("Criar")]),_:1}))]),default:M(()=>[v(ge,{class:"input",label:"Nome",modelValue:I.value,"onUpdate:modelValue":P[0]||(P[0]=W=>I.value=W),autocomplete:"getoff",onFocus:P[1]||(P[1]=W=>we(_).closeByField("name"))},null,8,["modelValue"])]),_:1},512))}},Ge=ie(Ye,[["__scopeId","data-v-0f93a94b"]]),Qe={key:0},Ze=["value"],et={__name:"Textarea",props:["modelValue","label"],setup(a){return(g,y)=>(c(),L("label",null,[a.label?(c(),L("span",Qe,re(a.label),1)):j("",!0),w("textarea",Ee({value:a.modelValue,onInput:y[0]||(y[0]=f=>g.$emit("update:modelValue",f.target.value))},g.$attrs),null,16,Ze)]))}},xe=ie(et,[["__scopeId","data-v-5f3c5f99"]]),tt={class:"carouselUi"},ot={class:"carouselUi"},nt={__name:"Carousel",props:{class:{type:String}},setup(a,{expose:g}){var X,ee;ye(p=>({"2d6388e2":O.value}));const y=a,f=e(),D=e(),_=e(),$=e(),k=e(),I=e(),h=e([]),l=e([]),b=e(0),B=e(),E=e(),o=e(!1),O=e(`${((X=f.value)==null?void 0:X.parentElement.offsetWidth)||0}px`),P=e(`${((ee=f.value)==null?void 0:ee.parentElement.offsetWidth)*.75||0}px`);le(o,()=>{setTimeout(()=>{var p;N(b.value,"smooth"),(p=D.value)==null||p.focus()},250)}),be(()=>{W(),window.addEventListener("resize",U),U()});function W(){let p={childList:!0};B.value=new MutationObserver(()=>{U()}),B.value.observe(k.value,p),B.value.observe(I.value,p),p={root:document.documentElement},E.value=new IntersectionObserver(n=>{n.forEach(u=>{u.isIntersecting&&U()})}),E.value.observe(f.value,p)}function F(){if(h.value=k.value?Array.from(k.value.children):[],!h.value.length){o.value&&(o.value=!1);return}h.value.map(p=>{p.style=`
			width: ${P.value};
			height: calc(100% - 33px);
			aspect-ratio: 16/9;
		`}),setTimeout(()=>{N(b.value,"auto")},0),l.value=I.value?Array.from(I.value.children):[],l.value.map(p=>{p.style=`
			width: ${window.innerWidth}px;
			height: calc(100dvh - 33px);
			overflow: auto;
		`})}function N(p,n="smooth"){h.value.length&&(p<0?p=0:p>=h.value.length&&(p=h.value.length-1),setTimeout(()=>{if(f.value){b.value=p;let u=f.value.getBoundingClientRect(),R=k.value.getBoundingClientRect(),ne=Array.from(k.value.children)[p].getBoundingClientRect();_.value.scrollTo({top:0,left:ne.x-R.x-(u.width-ne.width)/2,behavior:n}),setTimeout(()=>{if(I.value){let se=I.value.getBoundingClientRect(),te=Array.from(I.value.children)[p].getBoundingClientRect();$.value.scrollTo({top:0,left:te.x-se.x-(window.innerWidth-te.width)/2,behavior:n})}},0)}},0))}function Z(p){switch(p.key){case"ArrowLeft":N(--b.value);break;case"ArrowRight":N(++b.value);break}}function U(){var p,n;O.value=`${((p=f.value)==null?void 0:p.parentElement.offsetWidth)||0}px`,P.value=`${((n=f.value)==null?void 0:n.parentElement.offsetWidth)*.75||0}px`,F()}return g({fullScreen:o}),(p,n)=>(c(),L(Q,null,[w("div",{class:he(`carousel ${y.class||""}`),ref_key:"carousel",ref:f},[Ce(w("div",tt,[v(H,{class:"chevron-left",size:2,onClick:n[0]||(n[0]=u=>N(--b.value))}),v(H,{class:"chevron-right",size:2,onClick:n[1]||(n[1]=u=>N(++b.value))})],512),[[ke,h.value.length]]),Ce(w("div",{class:"carouselScroll",ref_key:"scroller",ref:_},[w("div",{class:"carouselSlidesWrapper",ref_key:"carouselSlidesWrapper",ref:k,onClick:n[2]||(n[2]=u=>o.value=!o.value)},[Se(p.$slots,"default",{},void 0,!0)],512)],512),[[ke,h.value.length]])],2),v(Be,{name:"grow"},{default:M(()=>[Ce(w("div",{class:he(`fullScreenCarousel ${y.class||""}`),ref_key:"fullScreenCarousel",ref:D,tabindex:"0",onKeydown:[n[6]||(n[6]=me(u=>{o.value&&(o.value=!1),u.stopPropagation(),u.preventDefault()},["escape"])),Z]},[w("div",ot,[v(H,{class:"chevron-left",size:2,onClick:n[3]||(n[3]=u=>N(--b.value))}),v(H,{class:"chevron-right",size:2,onClick:n[4]||(n[4]=u=>N(++b.value))})]),w("div",{class:"fullScreenCarouselScroll",ref_key:"fullScreenscroller",ref:$},[w("div",{class:"fullScreenCarouselSlidesWrapper",ref_key:"fullScreenCarouselSlidesWrapper",ref:I,onClick:n[5]||(n[5]=u=>o.value=!o.value)},[Se(p.$slots,"default",{},void 0,!0)],512)],512)],34),[[ke,o.value]])]),_:3})],64))}},Re=ie(nt,[["__scopeId","data-v-2546a38e"]]),st=["checked"],at={__name:"Checkbox",props:{modelValue:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},class:{type:String},pin:{type:Boolean,default:!1}},setup(a){ye(f=>({"61d6bacc":y.value}));const g=a,y=J(()=>g.rounded||g.pin?"50%":"0.15em");return(f,D)=>(c(),L("input",Ee({type:"checkbox",checked:a.modelValue,onChange:D[0]||(D[0]=_=>f.$emit("update:modelValue",_.target.checked)),class:`${g.class?g.class:""} ${g.pin?"pin":""}`},f.$attrs),null,16,st))}},lt=ie(at,[["__scopeId","data-v-64f9a7c4"]]),it={key:0,class:"todoActions"},dt={__name:"Todo",props:{todo:Object},emits:["removeTodo","newTodo","editTodo"],setup(a,{emit:g}){const y=a,f=e(),D=g;le(()=>y.todo.done,()=>{D("editTodo",y.todo)});function _(){y.todo.editing=!0,setTimeout(()=>{f.value.$el.focus()},0)}function $(){var h;if(!((h=y.todo.todo)!=null&&h.trim()))return!1;y.todo.editing=!1,D("editTodo",y.todo)}function k(){D("removeTodo",y.todo)}function I(){$(),D("newTodo")}return(h,l)=>(c(),L("li",{class:"todo",onClick:l[2]||(l[2]=()=>{a.todo.editing||(a.todo.done=!a.todo.done)}),onMouseenter:l[3]||(l[3]=b=>a.todo.mouseIn=!0),onMouseleave:l[4]||(l[4]=b=>a.todo.mouseIn=!1)},[v(lt,{modelValue:a.todo.done,"onUpdate:modelValue":l[0]||(l[0]=b=>a.todo.done=b)},null,8,["modelValue"]),v(ge,{ref_key:"input",ref:f,disabled:!a.todo.editing,onBlur:$,onKeypress:me(I,["enter"]),class:"todoInput",modelValue:a.todo.todo,"onUpdate:modelValue":l[1]||(l[1]=b=>a.todo.todo=b),placeholder:"Descreva a tarefa",style:Ie(`${a.todo.editing?"":"box-shadow: none; background: transparent; cursor: pointer; pointer-events: none;"} width: 100%;`)},null,8,["disabled","onKeypress","modelValue","style"]),a.todo.mouseIn&&a.todo.canEdit?(c(),L("div",it,[a.todo.editing?j("",!0):(c(),K(A,{key:0,class:"flat actionButton",onClick:S(_,["stop"])},{default:M(()=>[v(H,{class:"edit",size:1.25})]),_:1},8,["onClick"])),v(A,{class:"flat actionButton",onClick:S(k,["stop"]),style:{color:"var(--danger-light)"}},{default:M(()=>[v(H,{class:"trash-2",size:1.25})]),_:1},8,["onClick"])])):j("",!0)],32))}},Ue=ie(dt,[["__scopeId","data-v-43300fdc"]]),Ae=a=>(ze("data-v-1c5db466"),a=a(),Oe(),a),rt={key:0},ut={class:"todosList"},ct=Ae(()=>w("span",null,"Adicionar Todo",-1)),vt={key:0},ft=["onMouseenter","onMouseleave"],mt=["src"],pt=Ae(()=>w("span",null,"Adicionar Imagens",-1)),gt={id:"assignedList"},ht={__name:"CardModal",props:{members:{type:Array}},emits:["cardCreated","cardEdited"],setup(a,{expose:g,emit:y}){var z;ye(t=>({"419b3ca7":se.value,"555fcd50":te.value,"0deb9ba2":oe.value,"015e26b6":Y.value,f947ba12:ne.value,"64e59945":u.value})),$e();const f=e(),D=Le(),_=fe("Message").value,$=e(null),k=e(),I=e(),h=e(),l=J(()=>D.params.boardId),b=a,B=e(null),E=e(null),o=e(""),O=e(""),P=e([]),W=e([]),F=e({}),N=e([]),Z=e([]),U=e([]),X=e(!1),ee=y,p=e("");let n;le(p,()=>{clearTimeout(n),I.value.hide(),n=setTimeout(()=>{p.value&&(N.value=b.members.filter(t=>t.name.toLowerCase().includes(p.value.toLowerCase())||t.email.toLowerCase().includes(p.value.toLowerCase())).reduce((t,m)=>(U.value.find(T=>T._id===m._id)||t.push({leftComponent:"Image",rounded:!0,src:m.profilePictureUrl,size:2,alt:"User Avatar",label:m.name,action:()=>{U.value.push(m),I.value.hide(),p.value="",N.value=[]}}),t),[]),setTimeout(()=>{var t;N.value.length&&(d(),(t=I.value)==null||t.show(f.value.$el.querySelector("#searchInput"),"left"))},0))},500)});const u=e(0),R=J(()=>{var t;return(t=k.value)==null?void 0:t.fullScreen}),ne=J(()=>{var t;return(t=k.value)!=null&&t.fullScreen?"contain":"cover"}),se=J(()=>{var t;return(t=k.value)!=null&&t.fullScreen?"7px 77px":"0"}),te=e(window.innerWidth<window.innerHeight?"grid":"auto"),oe=e((z=k.value)!=null&&z.fullScreen&&window.innerWidth>window.innerHeight?"100%":"unset"),Y=e(`calc(50% - ${oe.value} / 2)`);le(R,()=>{d()});function pe(t,m){if(B.value=t,m){const{_id:T,title:de,description:Ke,todos:He}=JSON.parse(JSON.stringify(m));E.value=T,o.value=de,O.value=Ke||"",P.value=He.map(Te=>({...Te,canEdit:!0}));let Xe=m.images.map((Te,Fe)=>({...Te,src:m.imageUrls[Fe].src}));W.value=Xe,U.value=m.assignedTo?JSON.parse(JSON.stringify(m.assignedTo)):[],Z.value=m.comments?JSON.parse(JSON.stringify(m.comments)):[],X.value=!0}else X.value=!1;f.value.show(),window.addEventListener("resize",d),setTimeout(()=>{if(W.value.length){let T=W.value;W.value=[],setTimeout(()=>{W.value=T,d()},0)}},300)}function ce(){let t=f.value.$el.querySelector(".todosList .todo:last-child .todoInput input");(!P.value.length||t&&t.value.trim())&&P.value.push({todo:"",done:!1,editing:!0,canEdit:!0}),setTimeout(()=>{t=f.value.$el.querySelector(".todosList .todo:last-child .todoInput input"),t&&(t.editing=!0,setTimeout(()=>{t.focus()},0))},0)}function ve(t){P.value.splice(P.value.indexOf(t),1)}function r(t){W.value=[...W.value,...Array.from(t.target.files).reduce((m,T)=>{if(T.type.startsWith("image"))return[...m,{src:URL.createObjectURL(T),file:T}]},[])],t.target.value=""}function d(){const t=f.value.$el.querySelector("#searchInput");t&&(u.value=t.getBoundingClientRect().width+"px"),k.value&&(te.value=window.innerWidth<window.innerHeight?"grid":"auto",oe.value=k.value.fullScreen&&window.innerWidth>window.innerHeight?"calc(100% - 33px)":"unset",Y.value=`calc(50% - ${oe.value} / 2)`)}function x(){U.value.splice(U.value.indexOf(h.value.user),1),h.value.close()}function V(){let t=new FormData;return t.append("board",l.value),t.append("list",B.value._id||B.value),t.append("title",o.value),t.append("description",O.value),t.append("todos",JSON.stringify(P.value.map(m=>({todo:m.todo,done:m.done})))),W.value.map(m=>{m._id?t.append("keepImages",JSON.stringify(m)):(t.append("images",m.file),t.append("legends",F.value[m.file.name]))}),t.append("comments",JSON.stringify(Z.value)),t.append("assignedTo",JSON.stringify(U.value)),t}function i(t){t.shiftKey||(X.value?C():s(),t.preventDefault())}function s(){if(!o.value)return _.show({error:"Por favor, insira um título para o Card"});let t=V();G.createCard(t).then(m=>{ee("cardCreated",m.data),q(!0)})}function C(){if(!o.value)return _.show({error:"Por favor, insira um título para o Card"});let t=V();t.append("cardId",E.value),G.updateCard(t).then(m=>{ee("cardEdited",m.data),q(!0)})}function q(t){(t||X.value)&&(o.value="",O.value="",P.value=[],W.value=[],F.value={},U.value=[],Z.value=[]),f.value.close(),window.removeEventListener("resize",d)}return g({show:pe}),(t,m)=>(c(),L(Q,null,[v(Ne,{ref_key:"modal",ref:f,id:"cardModal",onClose:q},{header:M(()=>[w("b",null,re(X.value?"Editar":"Novo")+" Card",1)]),footer:M(()=>[v(A,{class:"secondary",onClick:m[9]||(m[9]=T=>q(!0))},{default:M(()=>[ue("Cancelar")]),_:1}),X.value?(c(),K(A,{key:0,onClick:C},{default:M(()=>[ue("Atualizar")]),_:1})):(c(),K(A,{key:1,onClick:s},{default:M(()=>[ue("Criar")]),_:1}))]),default:M(()=>[v(ge,{modelValue:o.value,"onUpdate:modelValue":m[0]||(m[0]=T=>o.value=T),label:"Título",class:"input",onFocus:m[1]||(m[1]=T=>we(_).closeByField("title")),onKeydown:me(S(i,["stop"]),["enter"])},null,8,["modelValue","onKeydown"]),v(xe,{modelValue:O.value,"onUpdate:modelValue":m[2]||(m[2]=T=>O.value=T),label:"Descrição",class:"input",style:{resize:"vertical"},onKeydown:me(S(i,["stop"]),["enter"])},null,8,["modelValue","onKeydown"]),w("fieldset",null,[P.value.length?(c(),L("legend",rt,"Todos")):j("",!0),w("ul",ut,[(c(!0),L(Q,null,ae(P.value,T=>(c(),K(Ue,{key:T,todo:T,onRemoveTodo:ve,onNewTodo:ce},null,8,["todo"]))),128))]),v(A,{onClick:ce,class:"flat addItemButton"},{default:M(()=>[v(H,{class:"check-square"}),ct]),_:1})]),w("fieldset",null,[W.value.length?(c(),L("legend",vt,"Imagens")):j("",!0),v(Re,{class:"carousel",ref_key:"carousel",ref:k},{default:M(()=>[(c(!0),L(Q,null,ae(W.value,T=>(c(),L("div",{key:T,class:"slideWrapper"},[w("div",{class:"slide",onMouseenter:de=>T.mouseIn=!0,onMouseleave:de=>T.mouseIn=!1},[w("img",{src:T.src,alt:"task image",class:"image"},null,8,mt),T.file?(c(),K(ge,{key:0,placeholder:"Legenda",modelValue:F.value[T.file.name],"onUpdate:modelValue":de=>F.value[T.file.name]=de,class:"legendInput",onClick:m[3]||(m[3]=S(()=>{},["stop"])),onKeydown:m[4]||(m[4]=S(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])):(c(),K(ge,{key:1,placeholder:"Legenda",modelValue:T.legend,"onUpdate:modelValue":de=>T.legend=de,class:"legendInput",onClick:m[5]||(m[5]=S(()=>{},["stop"])),onKeydown:m[6]||(m[6]=S(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])),T.mouseIn?(c(),K(A,{key:2,class:"rmImgButton",onClick:S(de=>W.value.splice(W.value.indexOf(T),1),["stop"])},{default:M(()=>[v(H,{class:"trash-2",size:1.15})]),_:2},1032,["onClick"])):j("",!0)],40,ft)]))),128))]),_:1},512),w("input",{type:"file",ref_key:"filePicker",ref:$,id:"filePicker",accept:"image/*",multiple:"",hidden:"",onChange:r},null,544),v(A,{onClick:m[7]||(m[7]=T=>$.value.click()),class:"flat addItemButton"},{default:M(()=>[v(H,{class:"image"}),pt]),_:1})]),v(ge,{id:"searchInput",type:"search",class:"input",label:"Atribuído a",placeholder:"Nome ou email",modelValue:p.value,"onUpdate:modelValue":m[8]||(m[8]=T=>p.value=T),autocomplete:"off"},null,8,["modelValue"]),v(Ve,{list:N.value,ref_key:"dropDown",ref:I,class:"searchResultList"},null,8,["list"]),w("div",gt,[(c(!0),L(Q,null,ae(U.value,T=>(c(),K(Pe,{key:T._id,user:T,class:"userBadge",onClick:de=>h.value.show(T)},null,8,["user","onClick"]))),128))])]),_:1},512),v(We,{ref_key:"profileModal",ref:h},{default:M(()=>[v(A,{class:"danger",onClick:x},{default:M(()=>[ue("Remover")]),_:1})]),_:1},512)],64))}},wt=ie(ht,[["__scopeId","data-v-1c5db466"]]),yt={class:"tabs"},bt={key:1},Ct={__name:"Tabs",setup(a,{expose:g}){const y=e(),f=e(),D=e(),_=e(!1),$=e([]),k=e(null);le(k,(b,B)=>{let E=f.value.querySelector(`[tab-id=${B}]`);E&&(E.classList.remove("active"),E.style.display="none");let o=f.value.querySelector(`[tab-id=${b}]`);o.classList.add("active"),o.style.display="block"}),be(()=>{I(),h()});function I(){let b={childList:!0};D.value=new MutationObserver(()=>{h()}),D.value.observe(f.value,b)}function h(){let b=Array.from(f.value.querySelectorAll("[tab-id]"));if(!b.length)return console.error("No tabs found. Each tab must have a [tab-id] attribute.");$.value=b.map(B=>(B.style.display="none",{id:B.getAttribute("tab-id"),icon:B.getAttribute("tab-icon"),title:B.getAttribute("tab-title")})),k.value=$.value[0].id}function l(b){k.value==b?_.value=!_.value:(k.value=b,_.value=!0)}return g({showingContent:_}),(b,B)=>(c(),L("div",yt,[w("header",{ref_key:"header",ref:y},[w("nav",null,[(c(!0),L(Q,null,ae($.value,E=>(c(),K(A,{key:E.id,class:he(`${k.value==E.id&&_.value?"active":"flat"} selector`),onClick:S(o=>l(E.id),["stop"]),onMousedown:B[0]||(B[0]=S(()=>{},["stop"]))},{default:M(()=>[E.icon?(c(),K(H,{key:0,class:he(E.icon),size:.95},null,8,["class"])):j("",!0),E.title?(c(),L("span",bt,re(E.title),1)):j("",!0)]),_:2},1032,["class","onClick"]))),128))])],512),v(Be,{name:"growDown"},{default:M(()=>[Ce(w("section",{ref_key:"section",ref:f},[Se(b.$slots,"default",{},void 0,!0)],512),[[ke,_.value]])]),_:3})]))}},kt=ie(Ct,[["__scopeId","data-v-668c376c"]]),_t=["id","onMousedown","onMouseenter","onTouchmove"],$t={key:0},Tt={key:1},St={style:{"padding-bottom":"24px"}},It={key:0,"tab-icon":"check-square","tab-id":"todosTab"},xt={class:"todosList"},Lt={key:1,"tab-icon":"image","tab-id":"imagesTab",class:"carouselTab"},Mt=["onMouseenter","onMouseleave"],Dt=["src"],Et={class:"legend"},Bt={"tab-icon":"message-square","tab-id":"commentsTab",class:"commentsTab"},Vt={class:"commentsList"},zt=["onMouseenter","onMouseleave"],Ot={key:0,class:"commentEditor"},Pt={key:1},Wt={key:2,class:"commentActions"},Nt={class:"newComment"},Rt={__name:"Card",props:{lists:Object,card:Object},emits:["showCardDropdown"],setup(a,{emit:g}){var V;ye(i=>({"06d4a020":p.value,df6ae6be:n.value,"5678ab86":u.value,"5ecca00d":R.value,df422180:ee.value}));const y=$e(),f=J(()=>y.state.board.draggingCard),D=e(),_=e(),$=e(),k=fe("Dialog").value,I=fe("Message").value,h=fe("profileModal").value,l=a,b=g,B=J(()=>{var i,s;return((i=y.state.board.draggingCard)==null?void 0:i._id)==((s=l.card)==null?void 0:s._id)}),E=J(()=>y.state.board.draggingShadow),o=e(null),O=e(null),P=e(null);let W,F,N=!1;const Z=J(()=>{var i;return!B.value&&l.card.mouseIn||((i=_.value)==null?void 0:i.showingContent)});le(B,()=>{if(B.value){window.addEventListener("mouseup",x);let i=f.value.e;W=(i.clientX||i.touches[0].clientX)-D.value.getBoundingClientRect().left,F=(i.clientY||i.touches[0].clientY)-D.value.getBoundingClientRect().top;let s=D.value.cloneNode(!0);s.style=D.value.style,s.style.height=D.value.offsetHeight+"px",s.style.width=D.value.offsetWidth+"px",s.style.position="absolute",s.style.pointerEvents="none",s.style.zIndex="100",document.body.appendChild(s),y.dispatch("board/setDraggingShadow",s),document.body.style.userSelect="none",document.body.style.cursor="grabbing",window.addEventListener("mousemove",d),window.addEventListener("touchmove",d)}else E.value&&(window.removeEventListener("mouseup",x),E.value.remove(),y.dispatch("board/setDraggingShadow",null)),document.body.style.userSelect="auto",document.body.style.cursor="default",window.removeEventListener("mousemove",d),window.removeEventListener("touchmove",d)});let U;le(()=>l.card.mouseIn,()=>{clearTimeout(U),U=setTimeout(()=>{l.card.mouseIn=!1},3e3)});const X=J(()=>{var i;return(i=$.value)==null?void 0:i.fullScreen}),ee=J(()=>{var i;return(i=$.value)!=null&&i.fullScreen?"contain":"cover"}),p=J(()=>{var i;return(i=$.value)!=null&&i.fullScreen?"7px 77px":"0"}),n=e(window.innerWidth<window.innerHeight?"grid":"auto"),u=e((V=$.value)!=null&&V.fullScreen&&window.innerWidth>window.innerHeight?"calc(100% - 33px)":"unset"),R=e(`calc(50% - ${u.value} / 2)`);le(X,()=>{se()}),be(()=>{window.addEventListener("resize",se)});function ne(i,s){b("showCardDropdown",i,s.list,s)}function se(){$.value&&(n.value=window.innerWidth<window.innerHeight?"grid":"auto",u.value=$.value.fullScreen&&window.innerWidth>window.innerHeight?"calc(100% - 33px)":"unset",R.value=`calc(50% - ${u.value} / 2)`)}function te(){G.updateCard({cardId:l.card._id,todos:l.card.todos}).then(i=>{l.card.todos=i.data.todos})}async function oe(i){await k.confirm("Tem certeza que deseja remover esta tarefa?")&&(l.card.todos.splice(l.card.todos.indexOf(i),1),te())}function Y(i){i.shiftKey||l.card.newComment&&(l.card.comments||(l.card.comments=[]),l.card.comments.push({user:y.state.userProfile._id,text:l.card.newComment}),G.updateCard({cardId:l.card._id,comments:l.card.comments}).then(s=>{l.card.newComment="",l.card.comments=s.data.comments}))}function pe(i,s){if(!(i!=null&&i.shiftKey)){if(!s.text)return I.show({error:"O comentário não pode estar vazio"});G.updateCard({cardId:l.card._id,comments:l.card.comments}).then(C=>{s.editing=!1,l.card.comments=C.data.comments})}}async function ce(i){await k.confirm("Deseja mesmo excluir este comentário?")&&(l.card.comments.splice(l.card.comments.indexOf(i),1),G.updateCard({cardId:l.card._id,comments:l.card.comments}).then(s=>{l.card.comments=s.data.comments}))}function ve(i){clearTimeout(P.value),N=!0,P.value=setTimeout(()=>{N&&(o.value=l.lists.find(s=>s.cards.find(C=>C._id==l.card._id)),O.value=o.value.cards.findIndex(s=>s._id==l.card._id),y.dispatch("board/setDraggingCard",{...l.card,e:i}))},150)}function r(){f.value&&f.value._id!=l.card._id&&De("changeCardsPositions",l.card._id)}function d(i){if(E.value)try{E.value.style.left=`${(i.clientX||i.touches[i.touches.length-1].clientX)-W}px`,E.value.style.top=`${(i.clientY||i.touches[i.touches.length-1].clientY)-F}px`}catch{}}function x(){let i=l.lists.find(s=>s.cards.find(C=>C._id==l.card._id));o.value._id!=i._id||O.value!=i.cards.findIndex(s=>s._id==l.card._id)?(l.card.list=i._id,De("moveCard")):y.dispatch("board/setDraggingCard",null)}return Me(()=>{window.removeEventListener("resize",se)}),(i,s)=>(c(),L("div",{id:a.card._id,class:he(`card ${B.value?"dragging":""}`),ref_key:"cardEl",ref:D,onMousemove:s[11]||(s[11]=C=>a.card.mouseIn=!0),onMousedown:S(ve,["stop","prevent"]),onTouchstart:s[12]||(s[12]=S(C=>{a.card.mouseIn=!0,ve(C)},["stop","prevent"])),onMouseleave:s[13]||(s[13]=C=>a.card.mouseIn=!1),onMouseenter:S(r,["stop","prevent"]),onTouchmove:S(r,["stop","prevent"]),onMouseup:s[14]||(s[14]=C=>_e(N)?N.value=!1:N=!1),onTouchend:s[15]||(s[15]=C=>_e(N)?N.value=!1:N=!1)},[w("header",null,[w("b",null,re(a.card.title),1),!f.value&&a.card.mouseIn?(c(),K(A,{key:0,class:"optionsBt",onMousedown:s[0]||(s[0]=S(()=>{},["stop"])),onTouchstart:s[1]||(s[1]=S(()=>{},["stop"])),onClick:s[2]||(s[2]=S(C=>ne(C.target,a.card),["stop"]))},{default:M(()=>[v(H,{class:"more-vertical",size:1.2})]),_:1})):j("",!0)]),a.card.description?(c(),L("hr",$t)):j("",!0),a.card.description||a.card.assignedTo?(c(),L("section",Tt,[w("p",St,re(a.card.description),1),w("div",{class:"assignedToListWrapper",style:Ie(`${Z.value?"bottom: 2px":"bottom: -22px"};`)},[(c(!0),L(Q,null,ae(a.card.assignedTo,C=>(c(),L("div",{key:`${a.card._id}-${C._id}`},[C.profilePictureUrl?(c(),K(qe,{key:0,class:"user",src:C.profilePictureUrl,alt:"user avatar",rounded:"",size:1.5,onClick:S(q=>we(h).show(C),["stop","prevent"]),onMousedown:s[3]||(s[3]=S(()=>{},["stop"])),onTouchstart:s[4]||(s[4]=S(()=>{},["stop"]))},null,8,["src","onClick"])):(c(),K(H,{key:1,class:"user",size:1.5,rounded:"",onClick:S(q=>we(h).show(C),["stop","prevent"]),onMousedown:s[5]||(s[5]=S(()=>{},["stop"])),onTouchstart:s[6]||(s[6]=S(()=>{},["stop"]))},null,8,["onClick"]))]))),128))],4)])):j("",!0),w("footer",{style:Ie(`opacity: ${Z.value?1:0};`)},[v(kt,{ref_key:"cardTabs",ref:_,onClick:s[8]||(s[8]=S(()=>{},["stop"])),onMousedown:s[9]||(s[9]=S(()=>{},["stop"])),onTouchstart:s[10]||(s[10]=S(()=>{},["stop"]))},{default:M(()=>{var C,q;return[(C=a.card.todos)!=null&&C.length?(c(),L("div",It,[w("ul",xt,[(c(!0),L(Q,null,ae(a.card.todos,z=>(c(),K(Ue,{key:z,todo:z,onRemoveTodo:t=>oe(z),onEditTodo:te},null,8,["todo","onRemoveTodo"]))),128))])])):j("",!0),(q=a.card.images)!=null&&q.length?(c(),L("div",Lt,[v(Re,{class:"carousel",ref_key:"carousel",ref:$},{default:M(()=>[(c(!0),L(Q,null,ae(a.card.imageUrls,z=>(c(),L("div",{key:z,class:"slideWrapper"},[w("div",{class:"slide",onMouseenter:t=>z.mouseIn=!0,onMouseleave:t=>z.mouseIn=!1},[w("img",{src:z.src,alt:"task image",class:"image"},null,8,Dt),w("span",Et,re(z.legend),1)],40,Mt)]))),128))]),_:1},512)])):j("",!0),w("div",Bt,[w("ul",Vt,[(c(!0),L(Q,null,ae(a.card.comments,z=>(c(),L("li",{key:z,onMouseenter:t=>z.mouseIn=!0,onMouseleave:t=>z.mouseIn=!1},[v(Pe,{user:z.user,style:{"font-weight":"bold"}},null,8,["user"]),z.editing?(c(),L("div",Ot,[v(xe,{placeholder:"Editar comentario",modelValue:z.text,"onUpdate:modelValue":t=>z.text=t,class:"commentInput",onKeypress:me(S(t=>pe(t,z),["stop"]),["enter"])},null,8,["modelValue","onUpdate:modelValue","onKeypress"]),w("div",null,[v(A,{type:"submit",class:"commentButton",onClick:t=>pe(null,z)},{default:M(()=>[v(H,{class:"edit",size:1})]),_:2},1032,["onClick"]),v(A,{class:"secondary commentButton",onClick:t=>z.editing=!1},{default:M(()=>[v(H,{class:"x",size:1})]),_:2},1032,["onClick"])])])):(c(),L("p",Pt,re(z.text),1)),z.mouseIn&&z.user._id===we(y).state.userProfile._id&&!z.editing?(c(),L("div",Wt,[v(A,{class:"flat actionBt",onClick:t=>ce(z)},{default:M(()=>[v(H,{class:"trash-2",size:1.15})]),_:2},1032,["onClick"]),v(A,{class:"flat actionBt",onClick:t=>z.editing=!0},{default:M(()=>[v(H,{class:"edit",size:1.15})]),_:2},1032,["onClick"])])):j("",!0)],40,zt))),128))]),w("div",Nt,[v(xe,{placeholder:"Comentar",modelValue:a.card.newComment,"onUpdate:modelValue":s[7]||(s[7]=z=>a.card.newComment=z),class:"commentInput",onKeypress:me(S(Y,["stop"]),["enter"])},null,8,["modelValue","onKeypress"]),v(A,{type:"submit",class:"flat commentButton",onClick:Y},{default:M(()=>[v(H,{class:"send",size:1})]),_:1})])])]}),_:1},512)],4)],42,_t))}},Ut=ie(Rt,[["__scopeId","data-v-002c568b"]]),At=a=>(ze("data-v-0c31959d"),a=a(),Oe(),a),Kt=["id","onMousedown","onTouchstart"],Ht=At(()=>w("span",null,"Novo Card",-1)),Xt={__name:"List",props:{lists:Object,list:Object},emits:["showListDropdown","showCardDropdown","showCardModal","changeListsPositions","updateListsPositions","moveCardToList"],setup(a,{emit:g}){ye(n=>({40982693:P.value}));const y=$e(),f=J(()=>y.state.board.draggingList),D=J(()=>y.state.board.draggingCard),_=e(),$=a,k=g,I=e(!1),h=e(null),l=e(null),b=e(null);let B,E,o=!1;le(I,()=>{var n;if(y.dispatch("board/setDraggingList",(n=I.value)==null?void 0:n._id),I.value){window.addEventListener("mouseup",X),window.addEventListener("touchend",X);let u=I.value.e,R=_.value.getBoundingClientRect();B=(u.clientX||u.touches[0].clientX)-R.left,E=(u.clientY||u.touches[0].clientY)-R.top,h.value=_.value.cloneNode(!0),h.value.style=_.value.style,h.value.style.height=_.value.offsetHeight+"px",h.value.style.position="absolute",h.value.style.pointerEvents="none",h.value.style.zIndex="100",document.body.appendChild(h.value),document.body.style.userSelect="none",document.body.style.cursor="grabbing"}else window.removeEventListener("mouseup",X),window.removeEventListener("touchend",X),h.value&&h.value.remove(),document.body.style.userSelect="auto",document.body.style.cursor="default"});const O=e(),P=e(O.value?O.value.offsetHeight+123+"px":0),W=e();be(()=>{F(),P.value=O.value?O.value.offsetHeight+123+"px":0,window.addEventListener("mousemove",p),window.addEventListener("touchmove",p)});function F(){let n={childList:!0,subtree:!0,attributes:!0};W.value=new MutationObserver(()=>{P.value=O.value?O.value.offsetHeight+123+"px":0}),W.value.observe(_.value,n)}function N(n,u){k("showListDropdown",n,u)}function Z(n,u,R){k("showCardDropdown",n,u,R)}function U(n){clearTimeout(b.value),o=!0,b.value=setTimeout(()=>{o&&(n.button==0||n.touches)&&(l.value=$.lists.findIndex(u=>u._id===$.list._id),I.value={_id:$.list._id,e:n})},150)}function X(){l.value!=$.lists.findIndex(n=>n._id===$.list._id)&&k("updateListsPositions"),setTimeout(()=>{I.value=!1},0)}function ee(){f.value&&f.value!=$.list._id&&k("changeListsPositions",$.list._id),D.value&&!$.list.cards.find(n=>n._id==D.value._id)&&k("moveCardToList",{from:$.lists.find(n=>n.cards.find(u=>u._id==D.value._id))._id,to:$.list._id})}function p(n){var u;if(f.value||D.value)if(f.value==_.value.id)try{h.value.style.left=`${(n.clientX||n.touches[n.touches.length-1].clientX)-B}px`,h.value.style.top=`${(n.clientY||n.touches[n.touches.length-1].clientY)-E}px`}catch{}else((u=n.touches)!=null&&u.length?document.elementsFromPoint(n.touches[n.touches.length-1].clientX,n.touches[n.touches.length-1].clientY):document.elementsFromPoint(n.clientX,n.clientY)).find(ne=>ne.id==_.value.id)&&ee()}return Me(()=>{var n;(n=W.value)==null||n.disconnect(),window.removeEventListener("mousemove",p),window.removeEventListener("touchmove",p)}),(n,u)=>(c(),L("div",{id:a.list._id,class:he(`list ${I.value?"dragging":""}`),ref_key:"listEl",ref:_,onMousedown:S(U,["stop","prevent"]),onTouchstart:S(U,["stop","prevent"]),onMouseup:u[6]||(u[6]=R=>_e(o)?o.value=!1:o=!1),onTouchend:u[7]||(u[7]=R=>_e(o)?o.value=!1:o=!1)},[w("header",null,[w("b",null,re(a.list.name),1),v(A,{class:"optionsBt",onMousedown:u[0]||(u[0]=S(()=>{},["stop"])),onTouchstart:u[1]||(u[1]=S(()=>{},["stop"])),onClick:u[2]||(u[2]=S(R=>N(R.target,a.list),["stop"]))},{default:M(()=>[v(H,{class:"more-vertical",size:1.5})]),_:1})]),w("section",null,[w("div",{class:"cardsWrapper",ref_key:"cardsWrapper",ref:O},[(c(!0),L(Q,null,ae(a.list.cards,R=>(c(),K(Ut,{key:R._id,lists:a.lists,card:R,onShowCardDropdown:Z},null,8,["lists","card"]))),128))],512)]),w("footer",null,[v(A,{class:"addCardBt",onMousedown:u[3]||(u[3]=S(()=>{},["stop"])),onTouchstart:u[4]||(u[4]=S(()=>{},["stop"])),onClick:u[5]||(u[5]=S(R=>n.$emit("showCardModal"),["stop"]))},{default:M(()=>[v(H,{class:"plus",size:1.7}),Ht]),_:1})])],42,Kt))}},Ft=ie(Xt,[["__scopeId","data-v-0c31959d"]]),qt={__name:"Board",setup(a){const g=$e(),y=Le(),f=e(y.params.boardId),D=e();Je("profileModal",D);const _=e(),$=e(),k=e(),I=fe("Message").value,h=fe("Dialog").value,l=e(),b=e(""),B=e({}),E=e([]),o=e([]),O=e([]),P=J(()=>g.state.board.dragScrolling);le(()=>y.params.boardId,()=>{f.value=y.params.boardId,b.value="",B.value={},E.value=[],o.value=[],W()}),be(()=>{W(),document.addEventListener("moveCard",ve),document.addEventListener("changeCardsPositions",ce)});function W(){G.getBoardDetails(f.value).then(r=>{b.value=r.data.board.name,g.dispatch("setTitle",r.data.board.name),B.value=r.data.board.owner,E.value=r.data.board.sharedWith,o.value=r.data.lists})}function F(r,d,x){if(_.value.showing)return _.value.hide(),r!==_.value.target?setTimeout(()=>{F(r,d,x)},200):void 0;O.value=[{leftComponent:"Icon",class:"edit",size:1.15,label:x?"Editar":"Renomear",action:()=>x?te(d,x):$.value.show(d)},{leftComponent:"Icon",class:"trash",size:1.15,label:"Excluir",action:async()=>{await h.confirm(`Deseja mesmo excluir ${x?"o card":"a lista"} <b style='font-size: 1.2em;'>${x?x.title:d.name}</b>?`)&&(x?G.deleteCard(x._id).then(()=>{n(x)}):G.deleteList(d._id).then(()=>{U(d)}))}}],setTimeout(()=>{_.value.toggleShowing(r,"right")},0)}function N(r){o.value.push(r)}function Z(r){o.value.splice(o.value.findIndex(d=>d._id===r._id),1,r),setTimeout(()=>{I.show({success:"Lista renomeada com sucesso!"})},0)}function U(r){o.value.splice(o.value.findIndex(d=>d._id===r._id),1),setTimeout(()=>{I.show({success:"Lista excluida com sucesso!"})},0)}function X(r){let d=g.state.board.draggingList,x=o.value.findIndex(i=>i._id===d),V=o.value.findIndex(i=>i._id===r);d=o.value.find(i=>i._id==d),x<V?(o.value.splice(V+1,0,d),o.value.splice(x,1)):(o.value.splice(x,1),o.value.splice(V,0,d))}function ee(){G.updateBoard({boardId:f.value,listsOrder:o.value.reduce((r,d)=>(r.push(d._id),r),[])})}function p(r){o.value.find(d=>d._id===r.list).cards.push(r)}function n(r){o.value.find(d=>d._id===r.list).cards.splice(o.value.find(d=>d._id===r.list).cards.findIndex(d=>d._id===r._id),1)}function u(r){o.value.find(d=>d._id===r.list).cards.splice(o.value.find(d=>d._id===r.list).cards.findIndex(d=>d._id===r._id),1,r)}function R(r){!g.state.board.draggingList&&r.clientX&&g.dispatch("board/setDragScrolling",{startX:r.clientX})}function ne(r){if(P.value&&!g.state.board.draggingList){g.dispatch("board/setDragScrolling",{...g.state.board.dragScrolling,x:r.clientX});let d=g.state.board.dragScrolling.x-g.state.board.dragScrolling.startX;d<0&&(d*=-1),d>10&&(l.value.scrollLeft-=g.state.board.dragScrolling.x-g.state.board.dragScrolling.startX,g.dispatch("board/setDragScrolling",{...g.state.board.dragScrolling,startX:g.state.board.dragScrolling.x}))}}function se(){g.dispatch("board/setDragScrolling",null)}function te(r,d){k.value.show(r,d)}let oe,Y;function pe({from:r,to:d}){let x=o.value.find(V=>V._id==r).cards.find(V=>V._id==g.state.board.draggingCard._id);oe=o.value.find(V=>V._id==r),oe.cards.splice(oe.cards.findIndex(V=>V._id==x._id),1),Y=o.value.find(V=>V._id==d),Y.cards||(Y.cards=[]),Y.cards.unshift(x)}function ce(r){let d=r.detail,x=g.state.board.draggingCard,V=o.value.find(C=>C.cards.find(q=>q._id==d));if(!V.cards.find(C=>C._id==x._id))return;oe=V,Y=V;let i=V.cards.findIndex(C=>C._id===x._id),s=V.cards.findIndex(C=>C._id===d);i<s?(V.cards.splice(s+1,0,x),V.cards.splice(i,1)):(V.cards.splice(i,1),V.cards.splice(s,0,x)),setTimeout(()=>{o.value.filter(C=>C._id!=V._id&&C.cards.find(q=>q._id==x._id)).map(C=>{C.cards.splice(C.cards.findIndex(q=>q._id==x._id),1)})},0)}function ve(){let r=g.state.board.draggingCard;r&&(G.moveCard({board:f.value,fromList:r.list,toList:Y._id,card:r._id,index:Y.cards.findIndex(d=>d._id===r._id)}),g.dispatch("board/setDraggingCard",null))}return Me(()=>{g.dispatch("setTitle","TaskBoard"),document.removeEventListener("moveCard",ve),document.removeEventListener("changeCardsPositions",ce)}),(r,d)=>(c(),L(Q,null,[w("section",{ref_key:"section",ref:l,onMousedown:R,onMousemove:ne,onMouseup:se,onMouseleave:se},[(c(!0),L(Q,null,ae(o.value,x=>(c(),K(Ft,{class:"boardList",id:x._id,key:x._id,lists:o.value,list:x,onShowListDropdown:F,onChangeListsPositions:X,onUpdateListsPositions:ee,onShowCardModal:V=>te(x,null),onShowCardDropdown:F,onMoveCardToList:pe},null,8,["id","lists","list","onShowCardModal"]))),128))],544),v(je,{id:"newListBt",onClick:d[0]||(d[0]=x=>$.value.show())},{default:M(()=>[ue("Nova Lista")]),_:1}),v(Ve,{ref_key:"dropDown",ref:_,list:O.value},null,8,["list"]),v(Ge,{ref_key:"listModal",ref:$,onListCreated:N,onListRenamed:Z},null,512),v(wt,{ref_key:"cardModal",ref:k,members:[B.value,...E.value],onCardCreated:p,onCardEdited:u},null,8,["members"]),v(We,{ref_key:"profileModal",ref:D},null,512)],64))}},Gt=ie(qt,[["__scopeId","data-v-a2f9972d"]]);export{Gt as default};