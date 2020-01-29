


class AnalysisCore{
  analyzer = {}

  intialize(dataObj : Object, intialTopic? : string){

  }

  addAnalysisComponent<T>(ac : AnalysisComponent<T>){

  }

  publish(topic : string, data : T) : void{
    if(analyzer[topic] == undefined){
      throw "No one is subscribed to this"
    }else{
        analyzer[topic].array.forEach(ac => {
            ac(data)
        });
    }
  };

  subscribe(topic : string) : void{
    if(analyzer[topic] == undefined){
      analyzer[topic] = [];
    }
    analyzer[topic].push((data) => this.analyze(data))
  };
}

