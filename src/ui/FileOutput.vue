<script>
export default {
  name: "FileOutput",
  props: {
    corpus: Object,
    selectedNode: Object
  },
  watch: {
    selectedNode(val) { if(!val) {this.selectedIndex = -1} }
  },
  data() {
    return {
      selectedIndex: -1
    }
  },
  methods: {
    selectConvo(c, index) {
      this.selectedIndex = index;
      this.$emit('select', c);
    },
  }
}
</script>

<template>
<div class="document" v-if="corpus">
  <header @click="selectConvo(null,-1)">
    <div>categories:</div>
    <div v-for="c in corpus.categories" :key="c">&nbsp;-&nbsp;{{c}}</div>
  </header>
  <section>
    <div>conversations:</div>
    <div :class="{'selected': index === selectedIndex }" v-for="(c, index) in corpus.conversations" :key="c" @click="selectConvo(c, index)">
      <div>&nbsp;-&nbsp;-&nbsp;{{c.request}}</div>
      <div v-for="r in c.responses" :key="r">&nbsp;&nbsp;-&nbsp;{{r}}</div>
    </div>    
  </section>
</div>
</template>

<style lang="scss" scope>
.document {
  padding: 5px;
  border: solid 1px rgba(0,0,0,0.4);
  overflow-y: auto;
  max-height: 80vh;

  header {
    margin-bottom: 10px;
  }
  section {
    padding-bottom: 10px;
    .selected {
      background-color: rgb(255, 255, 224);
    }
  }
}
</style>