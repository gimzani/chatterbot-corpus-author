//-------------------------------------------------------
import CorpusFile from './CorpusFile'
import Conversation from './Conversation'
//-------------------------------------------------------
export function writeFile(corpus) {

  return new Promise((resolve, reject) => {
    try {

      const blob = new Blob([serializeCorpus(corpus)], {type : 'application/x-yaml'});
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = corpus.fileName;

      document.body.appendChild(link);
      link.dispatchEvent(
        new MouseEvent('click', { 
          bubbles: true, 
          cancelable: true, 
          view: window 
        })
      );
      document.body.removeChild(link);

      resolve(true);
    } catch (e) {
      reject(e);
    }
  });

}

//-------------------------------------------------------
export function readFile(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        let fileData = parseCorpus(file, event.target.result); 
        resolve(fileData);
      });
      reader.readAsText(file);
    } catch (e) {
      reject(e);
    }
  });
}

//-------------------------------------------------------
//-------------------------------------------------------

function parseCorpus(file, data) {

  let reCategories = /categories:([\s\S]*)conversations:([\s\S]*)/;
  var match = reCategories.exec(data);

  let categories = match[1].split('\r\n').filter(i => i.length > 0).map(i => i.replace('- ',''));
  let convos = match[2].split('\r\n').filter(i => i.length > 0);

  let conversations = [];
  let subConvo = null;
  convos.forEach(i => {
    if(i.startsWith("- - ")) {
      if(subConvo) { conversations.push(subConvo); }      
      subConvo = new Conversation({ request: i.replace('- - ','') });
    } else {
      subConvo.responses.push(i.replace('  - ',''));
    }
  });
  conversations.push(subConvo);
  
  let corpus = new CorpusFile({
    fileName: file.name,
    categories: categories,
    conversations: conversations
  });

  return corpus;

}

//-------------------------------------------------------
function serializeCorpus(corpus) {
  let text = 'categories:';
  corpus.categories.forEach(c => text += '\r\n- ' + c);
  text += '\r\nconversations:';
  corpus.conversations.forEach(c => {
    text += '\r\n- - ' + c.request;
    c.responses.forEach(r => text += '\r\n  - ' + r);
  });
  return text;
}