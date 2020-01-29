import { AnalysisComponent } from "../../analysis/AnalysisComponent";
import AnalysisCore from '../../analysis/AnalysisCore';

class StubAB extends AnalysisComponent<string,string>{
    inputTopic = "A";
    outputTopic = "B";

    analyze(data: string) : string {
        console.log("AB Called")
        return data + "\nAB-Proccesed";
    };
}

class StubBC extends AnalysisComponent<string,string>{
    inputTopic = "B";
    outputTopic = "C";

    analyze(data: string) : string {
        console.log("BC Called")
        return data + "\nBC-Proccesed";
    };
}

describe('AnalysisCore class', () => {
  test('initialize', async (done) => {
    var core = new AnalysisCore()
    var abPart = new StubAB();
    var bcPart = new StubBC();
    var initialInput = {"A": "Data"};
    core.addAnalysisComponent<string,string>(abPart)
    core.addAnalysisComponent<string,string>(bcPart)
    core.intialize("A",initialInput);
    
    expect(initialInput["A"]).toEqual("Data")
    expect(initialInput["B"]).toEqual("Data\nAB-Proccesed")
    expect(initialInput["C"]).toEqual("Data\nAB-Proccesed\nBC-Proccesed")
    done()
  });
});