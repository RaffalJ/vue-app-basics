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

<script>
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import VueTagsInput from '@johmun/vue-tags-input';

import responseErrorParser from '@/utils/response-error-parser';
import toBase64 from '@/utils/to-base64';

@Component({
  components: {
    VueTagsInput
  }
})
export default class New extends Vue {
  formNewPost = {
    content: '',
    image: null,
    tags: [],
    tag: ''
  };
  formErrors = [];

  onFileSelected(event) {
    this.formNewPost.image = event.target.files[0];
  }

  async handleSubmit() {
    let image;
    try {
      image = await toBase64(this.formNewPost.image);
    } catch (error) {
      this.formErrors = [
        'Unable to process an image, allowed file formats are: .png, .jpg'
      ];
      return;
    }

    const url = 'http://localhost:3000/api/v1/posts';
    const tags = this.formNewPost.tags.map(tag => tag.text);
    const content = this.formNewPost.content;
    const payload = {
      content,
      image,
      tags
    };

    try {
      await axios.post(url, payload);
      this.resetFormValues();
    } catch (error) {
      this.formErrors = responseErrorParser(error.response.data);
    }
  }

  resetFormValues() {
    this.formNewPost = {
      content: '',
      image: null
    };
    this.formErrors = [];
    this.$refs.fileUpload.value = '';
  }
}
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
