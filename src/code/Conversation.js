export default class Conversation {
  constructor(options) {

    this.request = null;
    this.responses = [];

    if(options) {
      this.init(options);
    }
  }

  init(options) {
    this.request = options.request || this.request;
    this.responses = options.responses || this.responses;    
  }
}