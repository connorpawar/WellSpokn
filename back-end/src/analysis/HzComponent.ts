import { AnalysisComponent } from "./AnalysisComponent"
import * as mm from 'music-metadata';


class HzComponent extends AnalysisComponent<number>{
    inputTopic = new Set(["convertedFile"]);
    outputTopic = "hz";
  
    analyze(data : Object) : Promise<number>{
      var convertedFile = data["convertedFile"];
      return new Promise((resolve,reject) => {
        mm.parseFile(convertedFile, {duration:true}).then(metadata =>{
            var hz : number = metadata.format.sampleRate
            resolve(hz)
        })
      });
  }
}

export default HzComponent;
