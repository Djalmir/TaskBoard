import{_ as E,o,c as M,m as O,u as W,a as H,r as u,b as c,w as r,B as b,d as _,e as m,I as $,f as S,g as C,h as U,p as B,i as F,j as a,k as G,l as J,n as Q,q as t,T as X,t as D,s as V,v as Y,x as Z,F as ee,y as ae,z as T}from"./index-dyas_CNS.js";import{M as R,d as le,s as oe,P as se}from"./ProfilePictureModal-feXCkFTI.js";function te(l){l.target.maxLength=15;let d=l.target.value.replace(/\D/g,"").replace(/^(\d{2})(\d)/g,"($1) $2").replace(/(\d{3,5})(\d{3})/,"$1-$2");l.target.value=d}function ne(l){l.target.maxLength=10;let d=l.target.value.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").replace(/(\d{2})(\d)/,"$1/$2").replace(/(\d{4})(\d)/,"$1");l.target.value=d}const ue=["name","value"],re={__name:"Radio",props:{name:{type:String,required:!0},value:{type:[String,Number,Boolean],required:!0}},setup(l){return(d,y)=>(o(),M("input",O({type:"radio",name:l.name,value:l.value,onChange:y[0]||(y[0]=w=>d.$emit("update:modelValue",l.value))},d.$attrs),null,16,ue))}},z=E(re,[["__scopeId","data-v-c94483b9"]]),K=l=>(B("data-v-77944f54"),l=l(),F(),l),ie=K(()=>a("b",{id:"title"},"Excluir conta",-1)),de=K(()=>a("p",null,[a("b",{style:{color:"var(--danger-light)"}},"Atenção:"),a("br"),_(" Esta ação não poderá ser desfeita. ")],-1)),ce=K(()=>a("p",null,[_(" Ao prosseguir, "),a("b",null,"todos"),_(" os seus dados, de "),a("b",null,"todas"),_(" as aplicações da "),a("b",null,"Razion"),_(" serão excluídos. ")],-1)),pe={__name:"AccountDeletionModal",setup(l,{expose:d}){const y=W(),w=H(),h=u(),p=u("");function s(){h.value.show()}function k(){if(!p.value)return C("showMessage",{error:"Informe sua senha."});U.deleteAccount({password:p.value}).then(()=>{y.dispatch("setUserProfile",null),w.replace({name:"Home"}).then(()=>{C("showMessage",{success:"Conta excluída com sucesso!"})})})}function g(){p.value="",h.value.close()}return d({show:s}),(x,i)=>(o(),c(R,{ref_key:"modal",ref:h,onClose:g},{header:r(()=>[ie]),footer:r(()=>[m(b,{class:"secondary",onClick:g},{default:r(()=>[_("Cancelar")]),_:1}),m(b,{type:"submit",class:"danger",onClick:k},{default:r(()=>[_("Deletar minha conta")]),_:1})]),default:r(()=>[de,ce,m($,{class:"input",label:"Informe sua senha para prosseguir.",type:"password",modelValue:p.value,"onUpdate:modelValue":i[0]||(i[0]=v=>p.value=v),onKeypress:S(k,["enter"])},null,8,["modelValue","onKeypress"])]),_:1},512))}},ve=E(pe,[["__scopeId","data-v-77944f54"]]),fe=l=>(B("data-v-43679066"),l=l(),F(),l),me=fe(()=>a("b",null,"Alterar senha",-1)),_e={__name:"PasswordEditionModal",setup(l,{expose:d}){const y=u(),w=u(""),h=u(""),p=u("");function s(){y.value.show()}function k(){if(!w.value||!h.value||!p.value)return C("showMessage",{error:"Preencha todos os campos"});if(h.value!=p.value)return C("showMessage",{error:"As senhas não correspondem"});U.updateProfile({password:w.value,newPassword:h.value}).then(()=>{C("showMessage",{success:"Senha alterada com sucesso!"}),g()})}function g(){w.value="",h.value="",p.value="",y.value.close()}return d({show:s}),(x,i)=>(o(),c(R,{ref_key:"modal",ref:y,onClose:g},{header:r(()=>[me]),footer:r(()=>[m(b,{class:"secondary",onClick:g},{default:r(()=>[_("Cancelar")]),_:1}),m(b,{type:"submit",onClick:k},{default:r(()=>[_("Confirmar")]),_:1})]),default:r(()=>[m($,{class:"input",label:"Senha atual",type:"password",modelValue:w.value,"onUpdate:modelValue":i[0]||(i[0]=v=>w.value=v),onKeypress:S(k,["enter"])},null,8,["modelValue","onKeypress"]),m($,{class:"input",label:"Nova senha",type:"password",modelValue:h.value,"onUpdate:modelValue":i[1]||(i[1]=v=>h.value=v),onKeypress:S(k,["enter"])},null,8,["modelValue","onKeypress"]),m($,{class:"input",label:"Confirmar nova senha",type:"password",modelValue:p.value,"onUpdate:modelValue":i[2]||(i[2]=v=>p.value=v),onKeypress:S(k,["enter"])},null,8,["modelValue","onKeypress"])]),_:1},512))}},ye=E(_e,[["__scopeId","data-v-43679066"]]),I=l=>(B("data-v-fffac3af"),l=l(),F(),l),he={action:"javascript:void(0)"},ke={class:"flexDiv"},ge={id:"pictureInnerWrapper"},we={key:1,class:"info"},Pe=I(()=>a("b",null,"Nome",-1)),be={key:1,class:"info"},Ve=I(()=>a("b",null,"Email",-1)),xe={class:"flexDiv"},Me={key:1,class:"info"},$e=I(()=>a("b",null,"Telefone",-1)),Ce={key:3,class:"info"},Ie=I(()=>a("b",null,"Data de nascimento",-1)),De={class:"flexDiv",style:{"align-items":"flex-end","justify-content":"space-between"}},Se=I(()=>a("legend",null,"Sexo",-1)),Ue={class:"flexDiv"},Ee={key:0,style:{cursor:"pointer"}},Ae=I(()=>a("span",{style:{"padding-left":"7px"}},"Masculino",-1)),Be={key:1,style:{cursor:"pointer"}},Fe=I(()=>a("span",{style:{"padding-left":"7px"}},"Feminino",-1)),Ke={__name:"Profile",setup(l){const d=G(),y=u(),w=u(),h=u(),p=u();J("Dialog").value;const s=u(!1),k=u(""),g=u(""),x=u(""),i=u(""),v=u(""),P=u(""),A=u(!1);Q(()=>{N()});function N(){y.value.value="",U.getProfile().then(f=>{d.dispatch("setUserProfile",{...d.state.userProfile,...f.data}),k.value=f.data.profilePicture,g.value=f.data.name,x.value=f.data.email,i.value=f.data.phone,v.value=le(f.data.birthDate),P.value=f.data.sex})}function j(){const f=document.getElementById("filePicker").files[0];f&&(k.value=URL.createObjectURL(f))}function q(){let f=y.value.files[0],e=new FormData;if(!g.value)return C("showMessage",{error:"O campo nome é obrigatório"});if(e.append("name",g.value),!x.value)return C("showMessage",{error:"O campo email é obrigatório"});e.append("email",x.value),f&&e.append("profilePicture",f),i.value&&e.append("phone",i.value),v.value&&e.append("birthDate",oe(v.value)),P.value&&e.append("sex",P.value),U.updateProfile(e).then(n=>{d.dispatch("setUserProfile",{...d.state.userProfile,...n.data}),C("showMessage",{success:"Informações atualizadas com sucesso!"}),s.value=!1})}function L(){s.value=!1,N()}return(f,e)=>(o(),M(ee,null,[a("section",null,[a("form",he,[a("div",ke,[a("div",{id:"pictureWrapper",onMouseenter:e[2]||(e[2]=n=>A.value=!0),onMouseleave:e[3]||(e[3]=n=>A.value=!1)},[a("input",{type:"file",accept:"image/*",ref_key:"filePicker",ref:y,id:"filePicker",hidden:"",onChange:j},null,544),a("div",ge,[k.value?(o(),c(t(ae),{key:0,src:k.value,alt:"Profile picture",size:4.5,onClick:e[0]||(e[0]=()=>{s.value||p.value.show()})},null,8,["src"])):(o(),c(t(T),{key:1,class:"user",size:4.5}))]),m(X,{name:"grow"},{default:r(()=>[s.value&&A.value?(o(),c(t(b),{key:0,id:"editPictureBt",class:"secondary",onClick:e[1]||(e[1]=n=>y.value.click())},{default:r(()=>[m(t(T),{class:"edit-2",size:1.15})]),_:1})):V("",!0)]),_:1})],32),s.value?(o(),c(t($),{key:0,class:"input",type:"text",label:"Nome",modelValue:g.value,"onUpdate:modelValue":e[4]||(e[4]=n=>g.value=n),required:""},null,8,["modelValue"])):(o(),M("div",we,[Pe,a("span",null,D(g.value),1)]))]),s.value?(o(),c(t($),{key:0,class:"input",type:"email",label:"Email",modelValue:x.value,"onUpdate:modelValue":e[5]||(e[5]=n=>x.value=n),required:""},null,8,["modelValue"])):(o(),M("div",be,[Ve,a("span",null,D(x.value),1)])),a("div",xe,[s.value?(o(),c(t($),{key:0,class:"input",type:"text",inputmode:"numeric",label:"Telefone",modelValue:i.value,"onUpdate:modelValue":e[6]||(e[6]=n=>i.value=n),onInput:t(te)},null,8,["modelValue","onInput"])):(o(),M("div",Me,[$e,a("span",null,D(i.value),1)])),s.value?(o(),c(t($),{key:2,class:"input",type:"text",inputmode:"numeric",label:"Data de nascimento",modelValue:v.value,"onUpdate:modelValue":e[7]||(e[7]=n=>v.value=n),onInput:t(ne)},null,8,["modelValue","onInput"])):(o(),M("div",Ce,[Ie,a("span",null,D(v.value),1)]))]),a("div",De,[a("fieldset",null,[Se,a("div",Ue,[s.value||P.value=="M"?(o(),M("label",Ee,[s.value?(o(),c(t(z),{key:0,modelValue:P.value,"onUpdate:modelValue":e[8]||(e[8]=n=>P.value=n),name:"sex",value:"M",label:"Masculino",checked:P.value=="M"},null,8,["modelValue","checked"])):V("",!0),Ae])):V("",!0),s.value||P.value=="F"?(o(),M("label",Be,[s.value?(o(),c(t(z),{key:0,modelValue:P.value,"onUpdate:modelValue":e[9]||(e[9]=n=>P.value=n),name:"sex",value:"F",label:"Feminino",checked:P.value=="F"},null,8,["modelValue","checked"])):V("",!0),Fe])):V("",!0)])])]),Y(m(t(b),{id:"changePasswordBt",class:"danger",onClick:e[10]||(e[10]=n=>w.value.show())},{default:r(()=>[_("Alterar Senha")]),_:1},512),[[Z,s.value]]),a("footer",null,[s.value?V("",!0):(o(),c(t(b),{key:0,class:"danger",onClick:e[11]||(e[11]=n=>h.value.show())},{default:r(()=>[_("Excluir conta")]),_:1})),s.value?V("",!0):(o(),c(t(b),{key:1,class:"primary",onClick:e[12]||(e[12]=n=>s.value=!0)},{default:r(()=>[_("Editar")]),_:1})),s.value?(o(),c(t(b),{key:2,class:"secondary",onClick:L},{default:r(()=>[_("Cancelar")]),_:1})):V("",!0),s.value?(o(),c(t(b),{key:3,type:"submit",onClick:q},{default:r(()=>[_("Salvar")]),_:1})):V("",!0)])])]),m(t(ye),{ref_key:"passwordEditionModal",ref:w},null,512),m(t(ve),{ref_key:"accountDeletionModal",ref:h},null,512),m(t(se),{ref_key:"profilePictureModal",ref:p,src:k.value,alt:"Profile picture"},null,8,["src"])],64))}},ze=E(Ke,[["__scopeId","data-v-fffac3af"]]);export{ze as default};