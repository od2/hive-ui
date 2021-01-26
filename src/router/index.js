import { createRouter, createWebHistory } from "vue-router";
import Overview from "../views/Overview.vue";
import Tokens from "../views/Tokens.vue";

const routes = [
  {
    path: "/",
    name: "Overview",
    component: Overview
  },
  {
    path: "/tokens",
    name: "Tokens",
    component: Tokens
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
