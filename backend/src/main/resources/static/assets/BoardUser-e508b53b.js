import{U as n}from"./user.service-90a9ad5c.js";import{_ as a,o,c,a as t,t as r}from"./index-ea7f20a1.js";const _={name:"User",data(){return{content:""}},mounted(){n.getUserBoard().then(e=>{this.content=e.data},e=>{this.content=e.response&&e.response.data&&e.response.data.message||e.message||e.toString()})}},d={class:"container"},i={class:"jumbotron"};function p(e,l,m,u,s,h){return o(),c("div",d,[t("header",i,[t("h3",null,r(s.content),1)])])}const B=a(_,[["render",p]]);export{B as default};