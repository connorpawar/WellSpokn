import AnalysisCore from "./AnalysisCore";
import FileToAudioBytesComponent from './FileToAudioBytesComponent'
import GoogleTextToSpeechComponent from './GoogleTextToSpeechComponent'

//TODO: Is this the best place to initialize everything?
function generateAnalysisCore() : AnalysisCore{
    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string,string>(new FileToAudioBytesComponent())
    analysisCore.addAnalysisComponent<string,string>(new GoogleTextToSpeechComponent())
    return analysisCore
}

export default generateAnalysisCore;