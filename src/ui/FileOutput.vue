<script>
//------------------------------------------------------
import Conversation from '../code/Conversation'
//------------------------------------------------------
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
    newConversation() {
      this.selectedIndex = -1;
      this.$emit('select', new Conversation());
    }
  }
}
</script>

<template>
<div class="file-output" v-if="corpus">
  <header>
    <div>conversations:</div>
    <button @click="newConversation">New</button>
  </header>

  <div class="document" v-if="corpus.conversations.length> 0">
    <section>
      <div :class="{'selected': index === selectedIndex }" v-for="(c, index) in corpus.conversations" :key="c" @click="selectConvo(c, index)">
        <div>-&nbsp;-&nbsp;{{c.request}}</div>
        <div v-for="r in c.responses" :key="r">&nbsp;&nbsp;-&nbsp;{{r}}</div>
      </div>    
    </section>
  </div>
</div>

</template>

<style lang="scss" scope>
.file-output {
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }  
  
  .document {
    padding: 5px;
    border: solid 1px rgba(0,0,0,0.4);
    overflow-y: auto;
    max-height: 80vh;
    font-family:'Courier New', Courier, monospace;

    section {
      padding-bottom: 10px;
      .selected {
        background-color: rgb(255, 255, 224);
      }
    }
  }

}
</style>