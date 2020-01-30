import AnalysisCore from "./AnalysisCore";

export abstract class AnalysisComponent<I,O>{
  inputTopic : Set<string>;
  outputTopic : string;
  analysisCore : AnalysisCore;

  process(inputData: I, aggregateObject : Object)  : Promise<any> {
    return new Promise((resolve,reject) => {
      this.analyze(inputData).then(newData => {
        resolve(this.analysisCore.publish(this.outputTopic,newData,aggregateObject))
      })
    })
  };

  abstract analyze(data: I) : Promise<O>;
}

