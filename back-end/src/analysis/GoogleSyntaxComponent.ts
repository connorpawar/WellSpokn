const language = require('@google-cloud/language');
import { AnalysisComponent } from "./AnalysisComponent"


class GoogleSyntaxComponent extends AnalysisComponent<any>{
  languageClient = new language.LanguageServiceClient();
  inputTopic = new Set(["transcript"]);
  outputTopic = "syntaxanalysis";

  analyze(data: Object) : Promise<any>{
    var transcript = data["transcript"];
    return new Promise((resolve,reject) => {
      const document = {
        content: transcript,
        type: 'PLAIN_TEXT',
      };
      this.languageClient.analyzeSyntax({document: document})
      .then(allData => {
        //console.log(allData[0]); //TODO: Uncomment when debugging.
        resolve(allData)
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    });
  }
}

export default GoogleSyntaxComponent;
