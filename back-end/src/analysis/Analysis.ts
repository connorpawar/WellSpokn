import AnalysisCore from "./AnalysisCore";
import FileToAudioBytesComponent from './FileToAudioBytesComponent'
import GoogleTextToSpeechComponent from './GoogleTextToSpeechComponent'
import LanguageToolComponent from './LanguageToolComponent'

//TODO: Is this the best place to initialize everything?
function generateAnalysisCore() : AnalysisCore{
    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new FileToAudioBytesComponent())
    analysisCore.addAnalysisComponent<string>(new GoogleTextToSpeechComponent())
    analysisCore.addAnalysisComponent<Object>(new LanguageToolComponent())
    return analysisCore
}

export default generateAnalysisCore;
