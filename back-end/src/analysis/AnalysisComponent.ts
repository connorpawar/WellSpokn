
abstract class AnalysisComponent<T>{
  inputTopic : string;
  outputTopic : string;

  abstract analyze :  (data: T) => any;

  publish(analyzer : Object, data : T) : any{
    if(analyzer[this.outputTopic] == undefined){
      throw "No one is subscribed to this"
    }else{
    }
  };

  subscribe(analyzer : Object) : any{
    if(analyzer[this.inputTopic] == undefined){
      analyzer[this.inputTopic] = [];
    }
    analyzer[this.inputTopic].push((data) => this.analyze(data))
  };
}

