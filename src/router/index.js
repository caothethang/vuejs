import Vue from "vue";
import VueRouter from "vue-router";
/* eslint-disable */
Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
