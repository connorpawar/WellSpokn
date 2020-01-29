import { AnalysisComponent } from "./AnalysisComponent";

class AnalysisCore{
  analyzer = {}

  intialize(intialTopic : string, aggregateData : Object){
    if(this.analyzer[intialTopic] == undefined){
      // "No one is subscribed to this" Throw error?
    }else{
      this.analyzer[intialTopic].forEach(processFunc => {
        processFunc(this.analyzer,aggregateData[intialTopic],aggregateData)
      });
    }
  }

  addAnalysisComponent<I,O>(ac : AnalysisComponent<I,O>){
    ac.subscribe(this.analyzer)
  }
}

export default AnalysisCore;