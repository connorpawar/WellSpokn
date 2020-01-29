
export abstract class AnalysisComponent<I,O>{
  inputTopic : string;
  outputTopic : string;

  process(analyzer : Object, inputData: I, aggregateObject? : Object)  : any {
    var newData = this.analyze(inputData)
    console.log(analyzer)
    this.publish(analyzer,newData,aggregateObject)
  };

  abstract analyze(data: I) : O;

  publish(analyzer : Object, newData : O, aggregateData? : Object) : any{
    if(analyzer[this.outputTopic] == undefined){
      // "No one is subscribed to this" Throw error?
    }else{
      analyzer[this.outputTopic].forEach(processFunc => {
        processFunc(analyzer,newData,aggregateData)
      });
    }
    if(aggregateData != undefined){
      aggregateData[this.outputTopic] = newData;
    }
  };

  subscribe(analyzer : Object) : any{
    if(analyzer[this.inputTopic] == undefined){
      analyzer[this.inputTopic] = [];
    }
    analyzer[this.inputTopic].push((analyzer,newData,aggregateObject?) => this.process(analyzer,newData,aggregateObject))
  };
}

