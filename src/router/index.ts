import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "home" */ '../views/Dashboard.vue'),
  },
  {
    path: '/posts/new',
    name: 'PostsNew',
    component: () => import(/* webpackChunkName: "home" */ '../views/posts/New.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
