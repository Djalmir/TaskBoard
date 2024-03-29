import{_ as H,A as ae,l as K,r,n as q,C as se,i as oe,q as G,D as te,o as e,c as v,f as i,w as k,t as J,k as u,B as D,d as s,e as $,b as y,I as O,E as Q,F as T,G as U,g as le,p as X,j as Y,H as ne,s as A,z as P,J as z,y as j}from"./index-fCEgyX7s.js";import{U as re,P as Z,t as F,a as ie}from"./ProfileModal-InZAPEgM.js";import{M as de}from"./ProfilePictureModal-c5W_4-r2.js";const ue=B=>(X("data-v-fd3d4a81"),B=B(),Y(),B),ce=ue(()=>u("hr",null,null,-1)),ve={id:"sharingList"},he={__name:"BoardModal",emits:["boardCreated","boardEdited"],setup(B,{expose:W,emit:R}){ae(a=>({"22b94307":l.value}));const S=K(),M=r(),h=r(),w=r(),p=q("Message").value,I=r(!1),b=r(""),d=r(""),c=r([]),x=r([]),C=r("");let E;se(C,()=>{clearTimeout(E),h.value.hide(),E=setTimeout(()=>{C.value&&oe.searchProfile({search:C.value}).then(a=>{x.value=a.data.reduce((m,n)=>(n._id!==S.state.userProfile._id&&!c.value.find(L=>L._id===n._id)&&m.push({leftComponent:"Image",rounded:!0,src:n.profilePictureUrl,size:2,alt:"User Avatar",label:n.name,action:()=>{c.value.push(n),h.value.hide(),C.value="",x.value=[]}}),m),[])}).then(()=>{var a;x.value.length&&((a=h.value)==null||a.show(document.querySelector("#searchInput"),"left"))})},500)});const l=r(0),f=R;G(()=>{window.addEventListener("resize",o)});function N(a){if(a){const{_id:m,name:n,sharedWith:L}=JSON.parse(JSON.stringify(a));b.value=m,d.value=n,c.value=L,I.value=!0}else I.value=!1;M.value.show(),setTimeout(()=>{o()},300)}function o(){const a=document.querySelector("#searchInput");a&&(l.value=a.getBoundingClientRect().width+"px")}function g(){c.value.splice(c.value.indexOf(w.value.user),1),w.value.close()}function t(){if(!d.value)return p.show({error:"Por favor, insira um nome para o TaskBoard",field:"name"});F.createBoard({name:d.value,sharedWith:c.value.map(a=>a._id)}).then(a=>{f("boardCreated",{_id:a.data._id,name:d.value,sharedWith:c.value}),V()})}function _(){if(!d.value)return p.show({error:"Por favor, insira um nome para o TaskBoard",field:"name"});F.updateBoard({boardId:b.value,name:d.value,sharedWith:c.value.map(a=>a._id)}).then(a=>{f("boardEdited",{_id:a.data._id,name:d.value,sharedWith:c.value}),V()})}function V(){var a;b.value="",d.value="",c.value=[],x.value=[],C.value="",(a=h.value)==null||a.hide(),M.value.close()}return te(()=>{window.removeEventListener("resize",o)}),W({show:N}),(a,m)=>(e(),v(T,null,[i(s(de),{ref_key:"modal",ref:M,onClose:V,onKeypress:m[3]||(m[3]=le(()=>I.value?_():t(),["enter"]))},{header:k(()=>[u("b",null,J(I.value?"Editar":"Novo")+" TaskBoard",1)]),footer:k(()=>[i(s(D),{class:"secondary",onClick:V},{default:k(()=>[$("Cancelar")]),_:1}),I.value?(e(),y(s(D),{key:0,type:"submit",onClick:_},{default:k(()=>[$("Atualizar")]),_:1})):(e(),y(s(D),{key:1,type:"submit",onClick:t},{default:k(()=>[$("Criar")]),_:1}))]),default:k(()=>[i(s(O),{class:"input",label:"Nome",modelValue:d.value,"onUpdate:modelValue":m[0]||(m[0]=n=>d.value=n),autocomplete:"off",onFocus:m[1]||(m[1]=n=>s(p).closeByField("name"))},null,8,["modelValue"]),ce,i(s(O),{id:"searchInput",type:"search",class:"input",label:"Compartilhado com",placeholder:"Nome ou email",modelValue:C.value,"onUpdate:modelValue":m[2]||(m[2]=n=>C.value=n),autocomplete:"off"},null,8,["modelValue"]),i(s(Q),{list:x.value,ref_key:"dropDown",ref:h,class:"searchResultList"},null,8,["list"]),u("div",ve,[(e(!0),v(T,null,U(c.value,n=>(e(),y(re,{key:n._id,user:n,class:"userBadge",onClick:L=>w.value.show(n)},null,8,["user","onClick"]))),128))])]),_:1},512),i(Z,{ref_key:"profileModal",ref:w},{default:k(()=>[i(s(D),{class:"danger",onClick:g},{default:k(()=>[$("Remover")]),_:1})]),_:1},512)],64))}},pe=H(he,[["__scopeId","data-v-fd3d4a81"]]),ee=B=>(X("data-v-55c94356"),B=B(),Y(),B),fe={key:0,class:"my-boards"},me={class:"boards"},_e={style:{flex:"1"}},ke={key:0,class:"sharingList"},we=ee(()=>u("span",null,"Compartilhado com:",-1)),ye={class:"sharingListWrapper"},Be={key:1,class:"shared-boards"},Ce={class:"boards"},ge={class:"boardHeader"},Ie={style:{flex:"1"}},be={key:0,class:"sharingList"},Me=ee(()=>u("span",null,"Compartilhado com:",-1)),xe={class:"sharingListWrapper"},ze={__name:"Dashboard",setup(B){const W=K(),R=q("Dialog").value,S=q("Message").value,M=r(),h=r(),w=r(),p=r([]),I=r([]),b=r([]);G(()=>{F.listBoards().then(l=>{p.value=l.data.myBoards,b.value=l.data.sharedBoards,d()})});function d(){W.dispatch("setBoards",{myBoards:p.value,sharedWithMe:b.value})}function c(l,f){if(w.value.showing)return w.value.hide(),l!==w.value.target?setTimeout(()=>{c(l,f)},200):void 0;I.value=[{leftComponent:"Icon",class:"edit",size:1.15,label:"Editar",action:()=>M.value.show(f)},{leftComponent:"Icon",class:"trash",size:1.15,label:"Excluir",action:async()=>{await R.confirm(`Deseja mesmo excluir o TaskBoard <b style='font-size: 1.2em;'>${f.name}</b>?`)&&F.deleteBoard(f._id).then(()=>{E(f)})}}],setTimeout(()=>{w.value.toggleShowing(l,"right")},0)}function x(l){p.value.push(l),setTimeout(()=>{d()},0)}function C(l){p.value.splice(p.value.findIndex(f=>f._id===l._id),1,l),setTimeout(()=>{S.show({success:"Edições salvas com sucesso!"}),d()},0)}function E(l){p.value.splice(p.value.findIndex(f=>f._id===l._id),1),setTimeout(()=>{S.show({success:"TaskBoard excluido com sucesso!"}),d()},0)}return(l,f)=>{const N=ne("router-link");return e(),v(T,null,[i(s(ie),{id:"newBoardBt",action:()=>M.value.show()},{default:k(()=>[$("Novo TaskBoard")]),_:1},8,["action"]),u("section",null,[p.value.length?(e(),v("div",fe,[u("h2",null,[i(s(P),{class:"layout",size:2}),$(" - Meus TaskBoards ")]),u("div",me,[(e(!0),v(T,null,U(p.value,o=>(e(),v("div",{key:o._id},[i(N,{to:{name:"Board",params:{boardId:o._id}},class:"board"},{default:k(()=>{var g;return[u("b",_e,J(o.name),1),(g=o.sharedWith)!=null&&g.length?(e(),v("div",ke,[we,u("div",ye,[(e(!0),v(T,null,U(o.sharedWith,t=>(e(),v("div",{key:`${o._id}-${t._id}`},[t.profilePictureUrl?(e(),y(s(j),{key:0,class:"user",src:t.profilePictureUrl,alt:"user avatar",rounded:"",size:2.5,onClick:z(_=>h.value.show(t),["prevent"])},null,8,["src","onClick"])):(e(),y(s(P),{key:1,class:"user",size:2.5,rounded:"",onClick:z(_=>h.value.show(t),["prevent"])},null,8,["onClick"]))]))),128))])])):A("",!0)]}),_:2},1032,["to"]),i(s(D),{class:"optionsBt",onClick:z(g=>c(g.target,o),["prevent"])},{default:k(()=>[i(s(P),{class:"more-vertical",size:1.5})]),_:2},1032,["onClick"])]))),128))])])):A("",!0),b.value.length?(e(),v("div",Be,[u("h2",null,[i(s(P),{class:"send",size:2}),$(" - Compartilhados comigo ")]),u("div",Ce,[(e(!0),v(T,null,U(b.value,o=>(e(),y(N,{key:o._id,to:{name:"Board",params:{boardId:o._id}},class:"board"},{default:k(()=>{var g;return[u("div",ge,[u("b",Ie,J(o.name),1),o.owner.profilePictureUrl?(e(),y(s(j),{key:0,class:"user",src:o.owner.profilePictureUrl,alt:"user avatar",rounded:"",size:2.5,onClick:z(t=>h.value.show(o.owner),["prevent"])},null,8,["src","onClick"])):(e(),y(s(P),{key:1,class:"user",size:2.5,rounded:"",onClick:z(t=>h.value.show(o.owner),["prevent"])},null,8,["onClick"]))]),(g=o.sharedWith)!=null&&g.filter(t=>{var _;return t._id!==((_=s(W).state.userProfile)==null?void 0:_._id)}).length?(e(),v("div",be,[Me,u("div",xe,[(e(!0),v(T,null,U(o.sharedWith.filter(t=>{var _;return t.id!==((_=s(W).state.userProfile)==null?void 0:_._id)}),t=>(e(),v("div",{key:`${o._id}-${t._id}`},[t.profilePictureUrl?(e(),y(s(j),{key:0,class:"user",src:t.profilePictureUrl,alt:"user avatar",rounded:"",size:2.5,onClick:z(_=>h.value.show(t),["prevent"])},null,8,["src","onClick"])):(e(),y(s(P),{key:1,class:"user",size:2,onClick:z(_=>h.value.show(t),["prevent"])},null,8,["onClick"]))]))),128))])])):A("",!0)]}),_:2},1032,["to"]))),128))])])):A("",!0)]),i(pe,{ref_key:"boardModal",ref:M,onBoardCreated:x,onBoardEdited:C},null,512),i(Z,{ref_key:"profileModal",ref:h},null,512),i(s(Q),{ref_key:"dropDown",ref:w,list:I.value},null,8,["list"])],64)}}},We=H(ze,[["__scopeId","data-v-55c94356"]]);export{We as default};
