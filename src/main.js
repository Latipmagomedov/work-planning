import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import ApiPlugin from "./plugins/api";
import Calendar from "v-calendar/lib/components/calendar.umd";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(ApiPlugin);
Vue.component("calendar", Calendar);
Vue.component("date-picker", DatePicker);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
