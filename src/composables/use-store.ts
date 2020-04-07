import { provide, inject } from '@vue/composition-api';
import { Store } from 'vuex';

const StoreSymbol = Symbol();

// use "provide" with sets of value which we can
// then retrieve later with our injects
export function provideStore(store: Store<unknown>) {
  provide(StoreSymbol, store);
}

export function useStore() {
  const store = inject(StoreSymbol) as Store<unknown>;
  if (!store) {
    throw new Error('No store provided.');
  }
  return store;
}
