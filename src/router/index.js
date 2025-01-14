import { createRouter, createWebHistory } from "vue-router";
// import LoginPage from "../components/LoginPage.vue"; // LoginPage component
import HomePage from "../components/HomePage.vue"; // Main/Home page (you'll create this later)

const routes = [
  // {
  //   path: "/",
  //   name: "login",
  //   component: LoginPage,
  // },
  {
    path: "/",
    name: "home",
    component: HomePage, // You’ll create this Home page later
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
