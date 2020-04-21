const language = require('@google-cloud/language');
import { AnalysisComponent } from "./AnalysisComponent"


class RepeatAdjectiveComponent extends AnalysisComponent<any>{
  languageClient = new language.LanguageServiceClient();
  inputTopic = new Set(["syntaxanalysis"]);
  outputTopic = "repeatAdjectiveErrors";

  analyze(data: Array<any>) : Promise<any>{
    var syntax = data["syntaxanalysis"];
    return new Promise((resolve,reject) => {
      var numadj = 0;
      var adjectives = new Array(10);
      var repeatedadj = [];
      for(var i in syntax.tokens){
        if(syntax.tokens[i].partOfSpeech.tag == 'ADJ'){
          if(numadj < 10){
            numadj ++;
          }
          else{
            numadj = 0;
          }
          if(adjectives.includes(syntax.tokens[i].text.content)){
            repeatedadj.push({word: syntax.tokens[i].text.content, offset: syntax.tokens[i].text.beginOffset})
          }
          adjectives[numadj] = syntax.tokens[i].text.content;
        }
      }
      resolve(repeatedadj)
    });
  }
}

export default RepeatAdjectiveComponent;
