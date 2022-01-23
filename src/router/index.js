import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/views/auth"),
  },
  {
    path: "/",
    name: "Home",
    meta: { auth: true },
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    meta: { auth: true },
    component: () => import("@/views/favorites"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { auth: true },
    component: () => import("@/views/profile"),
  },
  {
    path: "/create-task",
    name: "CreatTask",
    meta: { auth: true },
    component: () => import("@/views/create-task"),
  },
  {
    path: "/task/:id",
    name: "Task",
    meta: { auth: true },
    component: () => import("@/views/task"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.token) store.dispatch("user/login", localStorage.token);

  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !store.getters.token) {
    next("/auth");
  } else if (!requireAuth && store.getters.token) {
    next("/");
  } else {
    next();
  }
});

export default router;
