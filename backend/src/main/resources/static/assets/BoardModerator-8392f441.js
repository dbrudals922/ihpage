import{U as s}from"./user.service-90a9ad5c.js";import{_ as a,o as n,c,a as e,t as r}from"./index-ea7f20a1.js";const d={name:"Moderator",data(){return{content:""}},mounted(){s.getModeratorBoard().then(t=>{this.content=t.data},t=>{this.content=t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}},i={class:"container"},p={class:"jumbotron"};function _(t,m,l,h,o,u){return n(),c("div",i,[e("header",p,[e("h3",null,r(o.content),1)])])}const B=a(d,[["render",_]]);export{B as default};
