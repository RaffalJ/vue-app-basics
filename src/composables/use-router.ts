import { provide, inject } from '@vue/composition-api';
import VueRouter from 'vue-router';

const RouterSymbol = Symbol();

export function provideRouter(router: VueRouter) {
  provide(RouterSymbol, router);
}

export function useRouter() {
  const router = inject(RouterSymbol) as VueRouter;
  if (!router) {
    throw new Error('No router provided.');
  }
  return router;
}
