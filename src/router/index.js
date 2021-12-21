import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("@/views/favorites"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/settings"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
