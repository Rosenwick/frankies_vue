import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
const Home = () => import(/* webpackChunkName: "home" */ "../views/Home.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/treeview",
    name: "Treeview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "treeview" */ "../views/Treeview.vue"),
  },
  {
    path: "/ToggleData",
    name: "ToggleData",
    component: () =>
      import(/* webpackChunkName: "toggledata" */ "../views/ToggleData.vue"),
  },
  {
    path: "/KlickToggleData",
    name: "KlickToggleData",
    component: () =>
      import(
        /* webpackChunkName: "draganddrop1" */ "../components/KlickToggleData.vue"
      ),
  },
  {
    path: "/ItemDragAndDrop",
    name: "ItemDragAndDrop",
    component: () =>
      import(
        /* webpackChunkName: "draganddrop1" */ "../components/DragAndDrop1.vue"
      ),
  },
  {
    path: "/RemoveAndInsert",
    name: "RemoveAndInsert",
    component: () =>
      import(
        /* webpackChunkName: "insertandremove" */ "../components/RemoveAndInsert.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
