import AnalysisCore from "./AnalysisCore";

//TODO: Is this the best place to initialize everything?
var analysisCore = new AnalysisCore();
import FileToAudioBytesComponent from './FileToAudioBytesComponent'
import GoogleTextToSpeechComponent from './GoogleTextToSpeechComponent'
analysisCore.addAnalysisComponent<string,string>(new FileToAudioBytesComponent())
analysisCore.addAnalysisComponent<string,string>(new GoogleTextToSpeechComponent())

export default analysisCore;