import Vue from "vue";
import App from "./App.vue";
import router from "./router";
const bus = new Vue()
export default bus
Vue.config.productionTip = false;
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
/* eslint-disable */
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
