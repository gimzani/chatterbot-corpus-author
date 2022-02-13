<script>
export default {
  name: "ConversationNode",
  props: {
    selectedNode: Object
  },
  data() {
    return {
      node: null,
      responses: null
    }
  },
  watch: {
    selectedNode: {
      handler(val) { 
        if(!val) { return }
        this.node = JSON.parse(JSON.stringify(this.selectedNode));
        this.responses = this.renderResponses(this.node.responses);
      },
      immediate: true
    }
  },
  methods: {
    parseResponses() {
      return this.responses.split('\n').filter(r => r.length>0).map(r => r.trim());
    },
    renderResponses(responses) {
      let text = '';
      responses.forEach((r, index) => {
        if(index > 0) { text += '\r\n' }
        text += r
      });
      return text;
    },
    parseNode() {
      this.node.responses = this.parseResponses();
      return JSON.parse(JSON.stringify(this.node));
    },
    saveNode() {
      let node = this.parseNode();
      this.$emit('save-node', node);
    },
  }
}
</script>

<template>
<div class="conversation-node" v-if="selectedNode">
  <div>
    <label>Input Phrase:</label>
    <textarea rows="1" v-model="node.request"></textarea>
  </div>
  <div>
    <label>Responses:</label>
    <textarea rows="4" v-model="responses"></textarea>
  </div>
  <div class="button-area">
    <button @click="saveNode">Save</button>
  </div>
</div>
</template>


<style lang="scss" scoped>
.conversation-node {
  margin: 10px;
  label { display: block }
  textarea { width: 100% }
  .button-area {
    margin-top: 5px;
    text-align: right;
  }
}
</style>