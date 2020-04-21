import { AnalysisComponent } from "./AnalysisComponent"
import * as mm from 'music-metadata';


class WordsPerMinuteComponent extends AnalysisComponent<number>{
    inputTopic = new Set(["audioFile","transcript"]);
    outputTopic = "wordsPerMinute";

    analyze(data : Object) : Promise<number>{
      var fileName = data["audioFile"];
      var transcript = data["transcript"];
      return new Promise((resolve,reject) => {
        // mm.parseFile(fileName, {duration:true}).then(metadata =>{
        //     var Minutes : number = metadata.format.duration/60
        //     var Words : number = transcript.split(" ").length
        //     resolve(Words/Minutes)
        // })
        resolve(125)
      });
  }
}

export default WordsPerMinuteComponent;
