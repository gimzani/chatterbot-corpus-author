<script>
//--------------------------------------
import * as fileIo from '../code/fileIo'
//--------------------------------------
export default {
  name: "MenuBar",
  props: {
    corpus: Object
  },
  methods: {
    async loadFile(evt) {
      const fileList = evt.target.files;
      for (const file of fileList) {
        let corpus = await fileIo.readFile(file);
        this.$emit('file-load', corpus);
      }
    },
    async saveFile() {
      await fileIo.writeFile(this.corpus); 
        this.$emit('file-save');     
    },
  }
}
</script>

<template>
<div class="menu-bar">
  <div class="brand">
    Corpus Editor
  </div>
  <div class="buttons">
    <button @click="saveFile">save</button>
    <button @click="$refs.fileselect.click()">Load</button>
    <input type="file" ref="fileselect" @change="loadFile" style="display:none">
  </div>
</div>
</template>

<style lang="scss" scoped>
.menu-bar {    
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: rgba(0, 85, 119, 0.856);
  height: 100%;

  .brand {
    color: #fff;
    font-weight: bold;
  }
}
</style>