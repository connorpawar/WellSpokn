const language = require('@google-cloud/language');
import { AnalysisComponent } from "./AnalysisComponent"

const language : any = require('@google-cloud/language');

class GooglSyntaxComponent extends AnalysisComponent<Sentiment>{
  languageClient = new language.LanguageServiceClient();
  inputTopic = new Set(["transcript"]);
  outputTopic = "syntaxanalysis";

  analyze(data: Object) : Promise<Sentiment>{
    var transcript = data["transcript"];
    return new Promise((resolve,reject) => {
      const document = {
        content: transcript,
        type: 'PLAIN_TEXT',
      };
      this.languageClient.analyzeSyntax({document: document})
      .then(allData => {
        console.log(allData[0]);
        resolve(allData)
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    });
  }
}

export default GoogleSyntaxComponent;
