
import { AnalysisComponent } from "./AnalysisComponent"

class FindPausesComponent extends AnalysisComponent<Array<any>>{
  inputTopic = new Set(["speechToTextRet"]);
  outputTopic = "pauses";

  analyze(data: Object) : Promise<Array<any>>{
    var speechToTextRet = data["speechToTextRet"];
    return new Promise((resolve,reject) => {
      console.log(speechToTextRet);
      var offset = 0;
      var startTime = 0;
      var endTime = 0;
      var pauses = [];
      for(var i in speechToTextRet.results){
        for(var j in speechToTextRet.results[i].alternatives[0].words){
          if(Number(i) != 0 && Number(j) != 0){
            startTime = speechToTextRet.results[i].alternatives[0].words[j].startTime.seconds
          }
          offset += speechToTextRet.results[i].alternatives[0].words[j].word.length;
          //TO:DO make this time better fit the
          if(endTime - startTime > 2){
            pauses.push({duration: endTime - startTime, offset: offset})
          }
          endTime = startTime + speechToTextRet.results[i].alternatives[0].words[j].endTime.seconds
          offset += 1;
        }
      }
      resolve(pauses);
    });
  }
}

export default FindPausesComponent;
