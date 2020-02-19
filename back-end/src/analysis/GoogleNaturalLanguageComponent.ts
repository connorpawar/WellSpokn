
import { AnalysisComponent } from "./AnalysisComponent"

interface Sentiment{
  magnitude : number,
  score : number
}

const language : any = require('@google-cloud/language');

class GoogleNaturalLanguageComponent extends AnalysisComponent<Sentiment>{
  languageClient = new language.LanguageServiceClient();
  inputTopic = new Set("transcript");
  outputTopic = "sentiment";

  analyze(data: Object) : Promise<Sentiment>{
    var transcript = data["transcript"];
    return new Promise((resolve,reject) => {
      reject("Stub")
    });
  }
}

export default GoogleNaturalLanguageComponent;
