<template>
  <div class="dashboard">
    <h2>{{ title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Dashboard',
  components: {},
  setup() {
    return {
      title: 'Dashboard'
    };
  }
});
</script>
