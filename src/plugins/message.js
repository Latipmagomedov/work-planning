import Message from "@/components/popUpMessage";

export default {
  install(Vue) {
    const messageContrustor = Vue.extend(Message);
    const message = new messageContrustor();
    message.$mount(document.createElement("div"));
    document.body.appendChild(message.$el);

    Vue.prototype.$message = message;
  },
};
