import{_ as U,o,c as x,m as W,r as n,a as d,w as u,b as f,B as P,d as m,I as M,e as D,f as $,g as S,p as A,h as B,i as a,u as j,j as H,k as G,l as J,n as Q,T as X,t as I,q as N,s as b,v as Y,x as Z,F as ee,y as T}from"./index-BOENqZPx.js";import{M as q,d as ae,P as le,s as oe}from"./date-CkqKRw61.js";const te=["name","value"],se={__name:"Radio",props:{name:{type:String,required:!0},value:{type:[String,Number,Boolean],required:!0}},setup(l){return(i,_)=>(o(),x("input",W({type:"radio",name:l.name,value:l.value,onChange:_[0]||(_[0]=g=>i.$emit("update:modelValue",l.value))},i.$attrs),null,16,te))}},R=U(se,[["__scopeId","data-v-488cf259"]]),ne=l=>(A("data-v-72030a8b"),l=l(),B(),l),ue=ne(()=>a("b",null,"Alterar senha",-1)),re={__name:"PasswordEditionModal",setup(l,{expose:i}){const _=n(),g=n(""),y=n(""),c=n("");function t(){_.value.show()}function h(){if(!g.value||!y.value||!c.value)return $("showMessage",{error:"Preencha todos os campos"});if(y.value!=c.value)return $("showMessage",{error:"As senhas não correspondem"});S.updateProfile({password:g.value,newPassword:y.value}).then(()=>{$("showMessage",{success:"Senha alterada com sucesso!"}),k()})}function k(){g.value="",y.value="",c.value="",_.value.close()}return i({show:t}),(V,r)=>(o(),d(q,{ref_key:"modal",ref:_,onClose:k},{header:u(()=>[ue]),footer:u(()=>[f(P,{class:"secondary",onClick:k},{default:u(()=>[m("Cancelar")]),_:1}),f(P,{type:"submit",onClick:h},{default:u(()=>[m("Confirmar")]),_:1})]),default:u(()=>[f(M,{class:"input",label:"Senha atual",type:"password",modelValue:g.value,"onUpdate:modelValue":r[0]||(r[0]=p=>g.value=p),onKeypress:D(h,["enter"])},null,8,["modelValue","onKeypress"]),f(M,{class:"input",label:"Nova senha",type:"password",modelValue:y.value,"onUpdate:modelValue":r[1]||(r[1]=p=>y.value=p),onKeypress:D(h,["enter"])},null,8,["modelValue","onKeypress"]),f(M,{class:"input",label:"Confirmar nova senha",type:"password",modelValue:c.value,"onUpdate:modelValue":r[2]||(r[2]=p=>c.value=p),onKeypress:D(h,["enter"])},null,8,["modelValue","onKeypress"])]),_:1},512))}},ie=U(re,[["__scopeId","data-v-72030a8b"]]),F=l=>(A("data-v-a4112974"),l=l(),B(),l),de=F(()=>a("b",{id:"title"},"Excluir conta",-1)),ce=F(()=>a("p",null,[a("b",{style:{color:"var(--danger-light)"}},"Atenção:"),a("br"),m(" Esta ação não poderá ser desfeita. ")],-1)),pe=F(()=>a("p",null,[m(" Ao prosseguir, "),a("b",null,"todos"),m(" os seus dados, de "),a("b",null,"todas"),m(" as aplicações da "),a("b",null,"Razion"),m(" serão excluídos. ")],-1)),ve={__name:"AccountDeletionModal",setup(l,{expose:i}){const _=j(),g=H(),y=n(),c=n("");function t(){y.value.show()}function h(){if(!c.value)return $("showMessage",{error:"Informe sua senha."});S.deleteAccount({password:c.value}).then(()=>{_.dispatch("setUserProfile",null),g.replace({name:"Home"}).then(()=>{$("showMessage",{success:"Conta excluída com sucesso!"})})})}function k(){c.value="",y.value.close()}return i({show:t}),(V,r)=>(o(),d(q,{ref_key:"modal",ref:y,onClose:k},{header:u(()=>[de]),footer:u(()=>[f(P,{class:"secondary",onClick:k},{default:u(()=>[m("Cancelar")]),_:1}),f(P,{type:"submit",class:"danger",onClick:h},{default:u(()=>[m("Deletar minha conta")]),_:1})]),default:u(()=>[ce,pe,f(M,{class:"input",label:"Informe sua senha para prosseguir.",type:"password",modelValue:c.value,"onUpdate:modelValue":r[0]||(r[0]=p=>c.value=p),onKeypress:D(h,["enter"])},null,8,["modelValue","onKeypress"])]),_:1},512))}},fe=U(ve,[["__scopeId","data-v-a4112974"]]);function me(l){l.target.maxLength=15;let i=l.target.value.replace(/\D/g,"").replace(/^(\d{2})(\d)/g,"($1) $2").replace(/(\d{3,5})(\d{3})/,"$1-$2");l.target.value=i}function _e(l){l.target.maxLength=10;let i=l.target.value.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").replace(/(\d{2})(\d)/,"$1/$2").replace(/(\d{4})(\d)/,"$1");l.target.value=i}const C=l=>(A("data-v-fe5c4968"),l=l(),B(),l),ye={action:"javascript:void(0)"},he={class:"flexDiv"},ke={id:"pictureInnerWrapper"},ge={key:1,class:"info"},we=C(()=>a("b",null,"Nome",-1)),Pe={key:1,class:"info"},be=C(()=>a("b",null,"Email",-1)),Ve={class:"flexDiv"},xe={key:1,class:"info"},Me=C(()=>a("b",null,"Telefone",-1)),$e={key:3,class:"info"},Ce=C(()=>a("b",null,"Data de nascimento",-1)),Ie={class:"flexDiv",style:{"align-items":"flex-end","justify-content":"space-between"}},De=C(()=>a("legend",null,"Sexo",-1)),Se={class:"flexDiv"},Ue={key:0,style:{cursor:"pointer"}},Ee=C(()=>a("span",{style:{"padding-left":"7px"}},"Masculino",-1)),Ae={key:1,style:{cursor:"pointer"}},Be=C(()=>a("span",{style:{"padding-left":"7px"}},"Feminino",-1)),Fe={__name:"Profile",setup(l){const i=j(),_=n(),g=n(),y=n(),c=n();G("Dialog").value;const t=n(!1),h=n(""),k=n(""),V=n(""),r=n(""),p=n(""),w=n(""),E=n(!1);J(()=>{K()});function K(){_.value.value="",S.getProfile().then(v=>{i.dispatch("setUserProfile",{...i.state.userProfile,...v.data}),h.value=v.data.profilePicture,k.value=v.data.name,V.value=v.data.email,r.value=v.data.phone,p.value=ae(v.data.birthDate),w.value=v.data.sex})}function z(){const v=document.getElementById("filePicker").files[0];v&&(h.value=URL.createObjectURL(v))}function L(){let v=_.value.files[0],e=new FormData;if(!k.value)return $("showMessage",{error:"O campo nome é obrigatório"});if(e.append("name",k.value),!V.value)return $("showMessage",{error:"O campo email é obrigatório"});e.append("email",V.value),v&&e.append("profilePicture",v),r.value&&e.append("phone",r.value),p.value&&e.append("birthDate",oe(p.value)),w.value&&e.append("sex",w.value),S.updateProfile(e).then(s=>{i.dispatch("setUserProfile",{...i.state.userProfile,...s.data}),$("showMessage",{success:"Informações atualizadas com sucesso!"}),t.value=!1})}function O(){t.value=!1,K()}return(v,e)=>(o(),x(ee,null,[a("section",null,[a("form",ye,[a("div",he,[a("div",{id:"pictureWrapper",onMouseenter:e[2]||(e[2]=s=>E.value=!0),onMouseleave:e[3]||(e[3]=s=>E.value=!1)},[a("input",{type:"file",accept:"image/*",ref_key:"filePicker",ref:_,id:"filePicker",hidden:"",onChange:z},null,544),a("div",ke,[h.value?(o(),d(Q,{key:0,src:h.value,alt:"Profile picture",size:4.5,onClick:e[0]||(e[0]=()=>{t.value||c.value.show()})},null,8,["src"])):(o(),d(T,{key:1,class:"user",size:4.5}))]),f(X,{name:"grow"},{default:u(()=>[t.value&&E.value?(o(),d(P,{key:0,id:"editPictureBt",class:"secondary",onClick:e[1]||(e[1]=s=>_.value.click())},{default:u(()=>[f(T,{class:"edit-2",size:1.15})]),_:1})):b("",!0)]),_:1})],32),t.value?(o(),d(M,{key:0,class:"input",type:"text",label:"Nome",modelValue:k.value,"onUpdate:modelValue":e[4]||(e[4]=s=>k.value=s),required:""},null,8,["modelValue"])):(o(),x("div",ge,[we,a("span",null,I(k.value),1)]))]),t.value?(o(),d(M,{key:0,class:"input",type:"email",label:"Email",modelValue:V.value,"onUpdate:modelValue":e[5]||(e[5]=s=>V.value=s),required:""},null,8,["modelValue"])):(o(),x("div",Pe,[be,a("span",null,I(V.value),1)])),a("div",Ve,[t.value?(o(),d(M,{key:0,class:"input",type:"text",inputmode:"numeric",label:"Telefone",modelValue:r.value,"onUpdate:modelValue":e[6]||(e[6]=s=>r.value=s),onInput:N(me)},null,8,["modelValue","onInput"])):(o(),x("div",xe,[Me,a("span",null,I(r.value),1)])),t.value?(o(),d(M,{key:2,class:"input",type:"text",inputmode:"numeric",label:"Data de nascimento",modelValue:p.value,"onUpdate:modelValue":e[7]||(e[7]=s=>p.value=s),onInput:N(_e)},null,8,["modelValue","onInput"])):(o(),x("div",$e,[Ce,a("span",null,I(p.value),1)]))]),a("div",Ie,[a("fieldset",null,[De,a("div",Se,[t.value||w.value=="M"?(o(),x("label",Ue,[t.value?(o(),d(R,{key:0,modelValue:w.value,"onUpdate:modelValue":e[8]||(e[8]=s=>w.value=s),name:"sex",value:"M",label:"Masculino",checked:w.value=="M"},null,8,["modelValue","checked"])):b("",!0),Ee])):b("",!0),t.value||w.value=="F"?(o(),x("label",Ae,[t.value?(o(),d(R,{key:0,modelValue:w.value,"onUpdate:modelValue":e[9]||(e[9]=s=>w.value=s),name:"sex",value:"F",label:"Feminino",checked:w.value=="F"},null,8,["modelValue","checked"])):b("",!0),Be])):b("",!0)])])]),Y(f(P,{id:"changePasswordBt",class:"danger",onClick:e[10]||(e[10]=s=>g.value.show())},{default:u(()=>[m("Alterar Senha")]),_:1},512),[[Z,t.value]]),a("footer",null,[t.value?b("",!0):(o(),d(P,{key:0,class:"danger",onClick:e[11]||(e[11]=s=>y.value.show())},{default:u(()=>[m("Excluir conta")]),_:1})),t.value?b("",!0):(o(),d(P,{key:1,class:"primary",onClick:e[12]||(e[12]=s=>t.value=!0)},{default:u(()=>[m("Editar")]),_:1})),t.value?(o(),d(P,{key:2,class:"secondary",onClick:O},{default:u(()=>[m("Cancelar")]),_:1})):b("",!0),t.value?(o(),d(P,{key:3,type:"submit",onClick:L},{default:u(()=>[m("Salvar")]),_:1})):b("",!0)])])]),f(ie,{ref_key:"passwordEditionModal",ref:g},null,512),f(fe,{ref_key:"accountDeletionModal",ref:y},null,512),f(le,{ref_key:"profilePictureModal",ref:c,src:h.value,alt:"Profile picture"},null,8,["src"])],64))}},Te=U(Fe,[["__scopeId","data-v-fe5c4968"]]);export{Te as default};