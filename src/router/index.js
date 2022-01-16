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
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/profile"),
    },
    {
        path: "/auth",
        name: "Auth",
        component: () => import("@/views/auth"),
    },
    {
        path: "/create-task",
        name: "CreatTask",
        component: () => import("@/views/create-task"),
    },
    {
        path: "/task/:id",
        name: "Task",
        component: () => import("@/views/task"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
