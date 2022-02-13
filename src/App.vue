<script>
//--------------------------------------------------------------------
import MenuBar from './ui/MenuBar.vue'
import FileOutput from './ui/FileOutput.vue'
import CategoryNode from './ui/CategoryNode.vue'
import ConversationNode from './ui/ConversationNode.vue'
//---------------------------------------
//--------------------------------------------------------------------
export default {
  name: "App",
  components: { MenuBar, FileOutput, CategoryNode, ConversationNode },
  data() {
    return {
      corpus: null,
      selectedNode: null
    }
  },
  methods: {
    fileLoad(corpus) {
      this.corpus = corpus;
    },
    fileSave() {
      console.log('save', this.corpus);
    },
    saveCategories(categories) {
      console.log(categories)
      this.corpus.categories = categories;
      console.log(this.corpus)
    },
    selectNode(node) {
      this.selectedNode = node;
    },
    saveNode(node) {
      for(let i=0; i < this.corpus.conversations.length; i++) {
          console.log('comp:', this.corpus.conversations[i], node)
        if(this.corpus.conversations[i].request === node.request) {
          this.corpus.conversations[i] = node;
          this.selectedNode = null;
          return;
        }
      }
      this.corpus.conversations.push(node);
      this.corpus.conversations.sort((a,b) => a.request < b.request ? -1 : 1); 
      this.selectedNode = null;
    }
  }
}
</script>

<template>
<div class="corpus-editor">
  <div class="menu">
    <MenuBar :corpus="corpus" @file-load="fileLoad" @file-save="fileSave"></MenuBar>
  </div>
  <div class="work-area">
    <div class="file-output">
      <CategoryNode :corpus="corpus" @save-categories="saveCategories"></CategoryNode>
      <FileOutput :corpus="corpus" :selected-node="selectedNode" @select="selectNode" ></FileOutput>
    </div>
    <div class="conversation-inputs">
      <ConversationNode :selected-node="selectedNode" @save-node="saveNode"></ConversationNode>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.corpus-editor {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  display: grid;
  grid-template-rows: 40px 1fr;

  .work-area {      
    display: grid;
    grid-template-columns: 1fr 1fr;

    .file-output {
      padding: 10px;
    }
  }
}
</style>