import { AnalysisComponent } from "../../analysis/AnalysisComponent";
import AnalysisCore from '../../analysis/AnalysisCore';

function resolveWrap<T>(data : T) : Promise<T> {
    return new Promise((resolve,reject) =>{
        resolve(data);
    })
}

class StubAB extends AnalysisComponent<string>{
    inputTopic = new Set("A");
    outputTopic = "B";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>(data["A"] + "\nAB-Proccesed");
    };
}

class StubBC extends AnalysisComponent<string>{
    inputTopic = new Set("B");
    outputTopic = "C";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>(data["B"] + "\nBC-Proccesed");
    };
}

class StubASplit extends AnalysisComponent<string>{
    inputTopic = new Set("A");
    outputTopic = "ASplit";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>(data["A"]+"ASplit");
    };
}

class StubBSplit extends AnalysisComponent<string>{
    inputTopic = new Set("B");
    outputTopic = "BSplit";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>(data["B"]+"BSplit");
    };
}

class Stub extends AnalysisComponent<string>{
    inputTopic = new Set("");
    outputTopic = "";

    analyze(data: string) : Promise<string> {
        return resolveWrap<string>(this.outputTopic);
    };
}
function QuickStub(i : Array<string>,o : string){
    var stub = new Stub();
    stub.inputTopic = new Set(i)
    stub.outputTopic = o;
    return stub
}


describe('AnalysisCore class', () => {
  test('initialize path with splits', async (done) => {
    var core = new AnalysisCore()
    var abPart = new StubAB();
    var bcPart = new StubBC();
    var aSplitPart = new StubASplit();
    var bSplitPart = new StubBSplit();
    var initialInput = {"A": "Data"};
    core.addAnalysisComponent<string>(abPart)
    core.addAnalysisComponent<string>(bcPart)
    core.addAnalysisComponent<string>(aSplitPart)
    core.addAnalysisComponent<string>(bSplitPart)
    var actualOutput = await core.intialize("A",initialInput);
    
    expect(actualOutput["A"]).toEqual("Data")
    expect(actualOutput["B"]).toEqual("Data\nAB-Proccesed")
    expect(actualOutput["C"]).toEqual("Data\nAB-Proccesed\nBC-Proccesed")
    expect(actualOutput["ASplit"]).toEqual("DataASplit")
    expect(actualOutput["BSplit"]).toEqual("Data\nAB-ProccesedBSplit")
    done()
  });
  test('initialize long path', async (done) => {
    var core = new AnalysisCore()
    var stringy = "QAZXSWEDCVFRTGBNHYUJMKIOPL"
    for (var i = 1; i < stringy.length; i++) {
        var component = new Stub();
        component.inputTopic = new Set(stringy.substring(i-1,i))
        component.outputTopic = stringy.substring(i,i+1)
        core.addAnalysisComponent<string>(component)
    }

    var initialInput = {"Q": "DummyStart"};
    var actualOutput = await core.intialize("Q",initialInput);

    for (var i = 2; i < stringy.length; i++) {
        expect(actualOutput[stringy.substring(i,i+1)]).toEqual(stringy.substring(i,i+1))
    }

    done()
  });
  test('test many input topics to trigger one', async (done) => {
    var core = new AnalysisCore()
    core.addAnalysisComponent<string>(QuickStub(["Q"], "A"))
    core.addAnalysisComponent<string>(QuickStub(["Q"], "X"))
    core.addAnalysisComponent<string>(QuickStub(["Q"], "S"))
    core.addAnalysisComponent<string>(QuickStub(["A","X","S"], "V"))
    var initialInput = {"Q": "Q"};
    var actualOutput = await core.intialize("Q",initialInput);

    expect(actualOutput["Q"]).toEqual("Q")
    expect(actualOutput["A"]).toEqual("A")
    expect(actualOutput["X"]).toEqual("X")
    expect(actualOutput["S"]).toEqual("S")
    expect(actualOutput["V"]).toEqual("V")

    done()
  });
});