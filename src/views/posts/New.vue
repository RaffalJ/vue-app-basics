<template>
  <div class="new-post">
    <div
      class="formErrors"
      v-for="(formError, index) in formErrors"
      :key="index"
    >
      {{ formError }}
    </div>

    <form class="formNewPost" @submit.prevent="handleSubmit">
      <label>Tags</label>
      <vue-tags-input
        v-model="formNewPost.tag"
        :tags="formNewPost.tags"
        @tags-changed="newTags => (formNewPost.tags = newTags)"
      />

      <label>Content</label>
      <input type="text" v-model="formNewPost.content" />
      <br />

      <input type="file" ref="fileUpload" @change="onFileSelected" />
      <button type="submit" :disabled="formNewPost.image === null">
        Upload
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import axios from 'axios';
import VueTagsInput from '@johmun/vue-tags-input';

export default defineComponent({
  name: 'PostsNew',
  components: {
    VueTagsInput,
  },
  setup() {
    return {
      formError: [],
      formNewPost: {
        content: '',
        image: null,
        tags: [],
        tag: ''
      },
    }
  }
});
</script>

<style scoped>
.new-post {
  width: 600px;
  margin: 0 auto;
}

.vue-tags-input {
  width: 200px;
  margin: 0 auto;
  font-size: 14px;
}
</style>
