import { AnalysisComponent } from "../../analysis/AnalysisComponent";
import AnalysisCore from '../../analysis/AnalysisCore';

class StubAB extends AnalysisComponent<string,string>{
    inputTopic = "A";
    outputTopic = "B";

    analyze(data: string) : string {
        return data + "\nAB-Proccesed";
    };
}

class StubBC extends AnalysisComponent<string,string>{
    inputTopic = "B";
    outputTopic = "C";

    analyze(data: string) : string {
        return data + "\nBC-Proccesed";
    };
}

class StubASplit extends AnalysisComponent<string,string>{
    inputTopic = "B";
    outputTopic = "ASplit";

    analyze(data: string) : string {
        return "ASplit";
    };
}

class StubBSplit extends AnalysisComponent<string,string>{
    inputTopic = "B";
    outputTopic = "BSplit";

    analyze(data: string) : string {
        return "BSplit";
    };
}
describe('AnalysisCore class', () => {
  test('initialize path', async (done) => {
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
  test('initialize path with splites', async (done) => {
    var core = new AnalysisCore()
    var abPart = new StubAB();
    var bcPart = new StubBC();
    var aSplitPart = new StubASplit();
    var bSplitPart = new StubBSplit();
    var initialInput = {"A": "Data"};
    core.addAnalysisComponent<string,string>(abPart)
    core.addAnalysisComponent<string,string>(bcPart)
    core.addAnalysisComponent<string,string>(aSplitPart)
    core.addAnalysisComponent<string,string>(bSplitPart)
    core.intialize("A",initialInput);
    
    expect(initialInput["A"]).toEqual("Data")
    expect(initialInput["B"]).toEqual("Data\nAB-Proccesed")
    expect(initialInput["C"]).toEqual("Data\nAB-Proccesed\nBC-Proccesed")
    expect(initialInput["ASplit"]).toEqual("ASplit")
    expect(initialInput["BSplit"]).toEqual("BSplit")
    done()
  });
});