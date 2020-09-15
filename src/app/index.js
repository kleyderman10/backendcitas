import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import Axios from 'axios';
Vue.use(VueAxios,Axios);

import App from  './App.vue';

const routes=[

];
const router=new VueRouter({mode:'history', routes: routes});
new Vue(vue.util.extend({router}),App).$mount('#app');