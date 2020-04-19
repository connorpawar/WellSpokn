const language = require('@google-cloud/language');
import { AnalysisComponent } from "./AnalysisComponent"

const language : any = require('@google-cloud/language');

class RepeatAdjectiveComponent extends AnalysisComponent<Sentiment>{
  languageClient = new language.LanguageServiceClient();
  inputTopic = new Set(["syntaxanalysis"]);
  outputTopic = "repeatAdjectiveErrors";

  analyze(data: Array) : Promise<Sentiment>{
    var syntax = data["syntaxanalysis"];
    return new Promise((resolve,reject) => {

    });
  }
}

export default RepeatAdjectiveComponent;
