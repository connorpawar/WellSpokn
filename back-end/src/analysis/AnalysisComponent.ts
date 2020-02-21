import AnalysisCore from "./AnalysisCore";

export abstract class AnalysisComponent<O>{
  inputTopic : Set<string>;
  outputTopic : string;
  analysisCore : AnalysisCore;

  process(aggregateObject : Object)  : Promise<any> {
    return new Promise((resolve,reject) => {
      this.analyze(aggregateObject).then(newData => {
        resolve(this.analysisCore.publish(this.outputTopic,newData,aggregateObject))
      })
    })
  };

  abstract analyze(data: Object) : Promise<O>;
}

