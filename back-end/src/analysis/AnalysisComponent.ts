
export abstract class AnalysisComponent<I,O>{
  inputTopic : string;
  outputTopic : string;

  process(analyzer : Object, inputData: I, aggregateObject? : Object)  : Promise<any> {
    return new Promise((resolve,reject) => {
      this.analyze(inputData).then(newData => {
        resolve(this.publish(analyzer,newData,aggregateObject))
      })
    })
  };

  abstract analyze(data: I) : Promise<O>;

  publish(analyzer : Object, newData : O, aggregateData? : Object) : Promise<any[]>{
    var promisesArr = []
    if(analyzer[this.outputTopic] == undefined){
      // "No one is subscribed to this" Throw error?
    }else{
      analyzer[this.outputTopic].forEach(processFunc => {
        promisesArr.push(processFunc(analyzer,newData,aggregateData))
      });
    }
    if(aggregateData != undefined){
      aggregateData[this.outputTopic] = newData;
    }
    return Promise.all(promisesArr);
  };

  subscribe(analyzer : Object) : any{
    if(analyzer[this.inputTopic] == undefined){
      analyzer[this.inputTopic] = [];
    }
    analyzer[this.inputTopic].push((analyzer,newData,aggregateObject?) => this.process(analyzer,newData,aggregateObject))
  };
}

