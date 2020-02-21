import { AnalysisComponent } from "./AnalysisComponent";

class AnalysisCore{
  analyzer = {}

  intialize(intialTopic : string, aggregateData : Object) : Promise<any>{
    return new Promise((resolve,reject) => {
      this.publish(intialTopic,aggregateData[intialTopic],aggregateData).then(() =>{
        resolve(aggregateData);
      });
    })
  }

  publish(outputTopic : string, newData : any, aggregateData : Object) : Promise<any[]>{
    var promisesArr = []
    aggregateData[outputTopic] = newData;
    if(this.analyzer[outputTopic] != undefined){
      this.analyzer[outputTopic].forEach(processFunc => {
        promisesArr.push(processFunc(newData,aggregateData))
      });
    }
    return Promise.all(promisesArr);
  };

  addAnalysisComponent<O>(ac : AnalysisComponent<O>){
    ac.analysisCore = this;
    ac.inputTopic.forEach(topic => {
      if(this.analyzer[topic] == undefined){
        this.analyzer[topic] = [];
      }
      this.analyzer[topic].push((newData,aggregateObject) :  Promise<any>  => {
        ac.inputTopic.delete(topic)
        if(ac.inputTopic.size == 0){
          return ac.process(aggregateObject)
        }else{
          return Promise.resolve();
        }
      });
    })
  }
}

export default AnalysisCore;