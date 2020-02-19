import AnalysisCore from "./AnalysisCore";
import FileToAudioBytesComponent from './FileToAudioBytesComponent'
import GoogleTextToSpeechComponent from './GoogleTextToSpeechComponent'
import GoogleNaturalLanguageComponent, {Sentiment} from './GoogleNaturalLanguageComponent'
import WordsPerMinuteComponent from './WordsPerMinuteComponent'

//TODO: Is this the best place to initialize everything?
function generateAnalysisCore() : AnalysisCore{
    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new FileToAudioBytesComponent())
    analysisCore.addAnalysisComponent<string>(new GoogleTextToSpeechComponent())
    analysisCore.addAnalysisComponent<Sentiment>(new GoogleNaturalLanguageComponent())
    analysisCore.addAnalysisComponent<number>(new WordsPerMinuteComponent())
    return analysisCore
}

export default generateAnalysisCore;