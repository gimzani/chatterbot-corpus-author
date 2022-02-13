<script>
export default {
  name: "CategoryNode",
  props: {
    corpus: Object
  },
  watch: {
    corpus: {
      handler(val) {
        if(val) { this.loadCategories(); }
      }
    }
  },
  data() {
    return {
      categories: null
    }
  },
  methods: {
    loadCategories() {
      let categories = this.corpus.categories.join(/\r*\n/);
      this.categories = categories;
    },
    saveCategories(evt) {
      let categories = evt.target.value.split(/\r*\n/);
      this.$emit('save-categories', categories);
    }
  }
}
</script>

<template>
<div class="categories-node" v-if="corpus">
  <label>Categories:</label>
  <textarea rows="2" :value="categories" @input="saveCategories"></textarea>
</div>
</template>

<style lang="scss" scoped>
.categories-node {
  label { display: block }
  textarea {
    width: 100%;
  }
}
</style>