export default class CorpusFile {
  constructor(options) {

    this.fileName = null;
    this.categories = [];
    this.conversations = [];

    if(options) {
      this.init(options);
    }
  }

  init(options) {

    this.fileName = options.fileName || this.fileName;
    this.categories = options.categories || this.categories;
    this.conversations = options.conversations || this.conversations;
    
  }
}