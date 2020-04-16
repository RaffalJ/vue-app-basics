<template>
  <div class="rooms">
    <h1>Rooms</h1>
    <div v-if="getRooms.error.value !== null">
      <p>{{ getRooms.error.value }}</p>
    </div>

    <div v-if="getRooms.loading.value === true">
      <loader-animation />
    </div>
    <div v-else>
      <p>Rooms {{ getRooms.results }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import api from '@/api';
import apiHandler from '@/composables/api-handler';
import LoaderAnimation from '@/components/LoaderAnimation.vue';

export default defineComponent({
  name: 'Rooms',
  components: {
    LoaderAnimation
  },
  setup() {
    const getRooms = apiHandler(() => api.fetchRooms());

    onMounted(() => {
      getRooms.createPromise();
    });

    return { getRooms };
  }
});
</script>
