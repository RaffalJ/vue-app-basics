import { ref } from "@vue/composition-api";

export default function usePromise(fn: Function) {
  const results = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const createPromise = async (...args: any) => {
    loading.value = true;
    error.value = null;
    results.value = null;

    try {
      results.value = await fn(...args)
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return { createPromise, results, loading, error };
}
