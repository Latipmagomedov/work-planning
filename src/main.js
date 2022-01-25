import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import ApiPlugin from "./plugins/api";
import MessagePlugin from "./plugins/message";

import FullModalWindow from "@/components/fullModalWindow/index.vue";

import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Vuelidate from "vuelidate";
import VueQrcodeReader from "vue-qrcode-reader";


Vue.config.productionTip = false;

Vue.use(ApiPlugin);
Vue.use(MessagePlugin);

Vue.component("FullModalWindow", FullModalWindow);

Vue.component("calendar", Calendar);
Vue.component("date-picker", DatePicker);
Vue.use(Vuelidate);
Vue.use(VueQrcodeReader);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
