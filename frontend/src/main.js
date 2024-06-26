import { createApp } from "vue";
import App from "./App.vue";
import router from "./index.js";
import store from "./store";

import { FontAwesomeIcon } from './plugins/font-awesome'


import { createPinia } from 'pinia';

import 'vue-fullpage.js/dist/style.css'
import VueFullPage from 'vue-fullpage.js'

// Toast
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'



const options = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,

  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,

  toastClassName: "toastCustomStyle",
};

// import moment from "moment";


const pinia = createPinia()

createApp(App)
  .use(router)
  .use(store)
  .use(VueFullPage)
  .use(pinia)
  .use(Toast, options)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
