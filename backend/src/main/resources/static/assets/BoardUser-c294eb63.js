import{U as n}from"./user.service-9d8c4571.js";import{_ as a,o,c,a as t,t as r}from"./index-91b9678f.js";const _={name:"User",data(){return{content:""}},mounted(){n.getUserBoard().then(e=>{this.content=e.data},e=>{this.content=e.response&&e.response.data&&e.response.data.message||e.message||e.toString()})}},d={class:"container"},i={class:"jumbotron"};function p(e,l,m,u,s,h){return o(),c("div",d,[t("header",i,[t("h3",null,r(s.content),1)])])}const B=a(_,[["render",p]]);export{B as default};
