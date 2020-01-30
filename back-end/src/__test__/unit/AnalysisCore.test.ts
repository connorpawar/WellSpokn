import { AnalysisComponent } from "../../analysis/AnalysisComponent";
import AnalysisCore from '../../analysis/AnalysisCore';

function resolveWrap<T>(data : T) : Promise<T> {
    return new Promise((resolve,reject) =>{
        resolve(data);
    })
}

class StubAB extends AnalysisComponent<string,string>{
    inputTopic = new Set("A");
    outputTopic = "B";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>(data + "\nAB-Proccesed");
    };
}

class StubBC extends AnalysisComponent<string,string>{
    inputTopic = new Set("B");
    outputTopic = "C";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>(data + "\nBC-Proccesed");
    };
}

class StubASplit extends AnalysisComponent<string,string>{
    inputTopic = new Set("B");
    outputTopic = "ASplit";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>("ASplit");
    };
}

class StubBSplit extends AnalysisComponent<string,string>{
    inputTopic = new Set("B");
    outputTopic = "BSplit";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>("BSplit");
    };
}

class Stub extends AnalysisComponent<string,string>{
    inputTopic = new Set("");
    outputTopic = "";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>(this.outputTopic);
    };
}
describe('AnalysisCore class', () => {
  test('initialize path with splits', async (done) => {
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
    var actualOutput = await core.intialize("A",initialInput);
    
    expect(actualOutput["A"]).toEqual("Data")
    expect(actualOutput["B"]).toEqual("Data\nAB-Proccesed")
    expect(actualOutput["C"]).toEqual("Data\nAB-Proccesed\nBC-Proccesed")
    expect(actualOutput["ASplit"]).toEqual("ASplit")
    expect(actualOutput["BSplit"]).toEqual("BSplit")
    done()
  });
  test('initialize long path', async (done) => {
    var core = new AnalysisCore()
    var stringy = "QAZXSWEDCVFRTGBNHYUJMKIOPL"
    for (var i = 1; i < stringy.length; i++) {
        var component = new Stub();
        component.inputTopic = new Set(stringy.substring(i-1,i))
        component.outputTopic = stringy.substring(i,i+1)
        core.addAnalysisComponent<string,string>(component)
    }

    var initialInput = {"Q": "DummyStart"};
    var actualOutput = await core.intialize("Q",initialInput);

    for (var i = 2; i < stringy.length; i++) {
        expect(actualOutput[stringy.substring(i,i+1)]).toEqual(stringy.substring(i,i+1))
    }

    done()
  });
});