import{b as r}from"./index-ea7f20a1.js";function a(){let e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{Authorization:"Bearer "+e.accessToken}:{}}const t="http://52.78.94.72:8080/api/test/";class s{getPublicContent(){return r.get(t+"all")}getUserBoard(){return r.get(t+"student",{headers:a()})}getModeratorBoard(){return r.get(t+"teacher",{headers:a()})}getAdminBoard(){return r.get(t+"admin",{headers:a()})}}const o=new s;export{o as U};
