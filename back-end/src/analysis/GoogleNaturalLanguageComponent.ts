
import { AnalysisComponent } from "./AnalysisComponent"

export interface Sentiment{
  magnitude : number,
  score : number
}

const language : any = require('@google-cloud/language');

class GoogleNaturalLanguageComponent extends AnalysisComponent<Sentiment>{
  languageClient = new language.LanguageServiceClient();
  inputTopic = new Set(["transcript"]);
  outputTopic = "sentiment";

  analyze(data: Object) : Promise<Sentiment>{
    var transcript = data["transcript"];
    return new Promise((resolve,reject) => {
      const document = {
        content: transcript,
        type: 'PLAIN_TEXT',
      };
      this.languageClient.analyzeSentiment({document: document})
      .then(allData => {
        resolve(allData)
      })
    });
  }
}

export default GoogleNaturalLanguageComponent;
