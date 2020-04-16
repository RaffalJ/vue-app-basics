<template>
  <div class="rooms">
      <h1>Rooms</h1>
      Search for <input v-model="searchInput" />
      <p>Loading: {{ getRooms.loading }}</p>
      <p>Error: {{ getRooms.error }}</p>
      <p>Rooms {{ getRooms.results }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive } from '@vue/composition-api';
import api from '@/api';
import apiHandler from '@/composables/api-handler';

export default defineComponent({
  name: 'Rooms',
  components: {},
  setup() {
    const searchInput = ref("");
    const getRooms = apiHandler(() => api.fetchRooms());

    watch(searchInput, () => {
      if (searchInput.value !== "") {
        getRooms.createPromise();
      } else {
        getRooms.results.value = null;
      }
    });

    return { searchInput, getRooms };
  }
});
</script>
