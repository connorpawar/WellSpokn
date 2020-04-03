import AnalysisCore from "./AnalysisCore";
import FileToAudioBytesComponent from './FileToAudioBytesComponent'
import GoogleSpeechToTextComponent from './GoogleSpeechToTextComponent'
import GoogleNaturalLanguageComponent, {Sentiment} from './GoogleNaturalLanguageComponent'
import WordsPerMinuteComponent from './WordsPerMinuteComponent'
import LanguageToolComponent from './LanguageToolComponent'

//TODO: Is this the best place to initialize everything?
function generateAnalysisCore() : AnalysisCore{
    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new FileToAudioBytesComponent())
    analysisCore.addAnalysisComponent<string>(new GoogleSpeechToTextComponent())
    analysisCore.addAnalysisComponent<Sentiment>(new GoogleNaturalLanguageComponent())
    analysisCore.addAnalysisComponent<number>(new WordsPerMinuteComponent())
    //TODO Uncomment when languageTool is better configured for a production env
    //analysisCore.addAnalysisComponent<Object>(new LanguageToolComponent())
    return analysisCore
}

export default generateAnalysisCore;
