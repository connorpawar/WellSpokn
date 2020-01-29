import { AnalysisComponent } from "./AnalysisComponent";

class AnalysisCore{
  analyzer = {}

  intialize(intialTopic : string, aggregateData : Object) : Promise<any[]>{
    var promisesArr = []
    if(this.analyzer[intialTopic] == undefined){
    // "No one is subscribed to this" Throw error?
    }else{
        this.analyzer[intialTopic].forEach(processFunc => {
            promisesArr.push(processFunc(this.analyzer,aggregateData[intialTopic],aggregateData))
        });
    }
    return Promise.all(promisesArr);
  }

  addAnalysisComponent<I,O>(ac : AnalysisComponent<I,O>){
    ac.subscribe(this.analyzer)
  }
}

export default AnalysisCore;