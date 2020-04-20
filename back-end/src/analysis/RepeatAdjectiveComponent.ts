const language = require('@google-cloud/language');
import { AnalysisComponent } from "./AnalysisComponent"


class RepeatAdjectiveComponent extends AnalysisComponent<any>{
  languageClient = new language.LanguageServiceClient();
  inputTopic = new Set(["syntaxanalysis"]);
  outputTopic = "repeatAdjectiveErrors";

  analyze(data: Array<any>) : Promise<any>{
    var syntax = data["syntaxanalysis"];
    return new Promise((resolve,reject) => {

    });
  }
}

export default RepeatAdjectiveComponent;
