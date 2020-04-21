import AnalysisCore from "./AnalysisCore";
import FileConverterComponent from './FileConverterComponent'
import GoogleSpeechToTextComponent from './GoogleSpeechToTextComponent'
import GoogleNaturalLanguageComponent, {Sentiment} from './GoogleNaturalLanguageComponent'
import GoogleSyntaxComponent from './GoogleSyntaxComponent'
import WordsPerMinuteComponent from './WordsPerMinuteComponent'
import LanguageToolComponent from './LanguageToolComponent'

//TODO: Is this the best place to initialize everything?
function generateAnalysisCore() : AnalysisCore{
    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new FileConverterComponent())
    analysisCore.addAnalysisComponent<string>(new GoogleSpeechToTextComponent())
    analysisCore.addAnalysisComponent<Sentiment>(new GoogleNaturalLanguageComponent())
    analysisCore.addAnalysisComponent<Object>(new GoogleSyntaxComponent())
    analysisCore.addAnalysisComponent<number>(new WordsPerMinuteComponent())
    analysisCore.addAnalysisComponent<Object>(new LanguageToolComponent())
    return analysisCore
}

export default generateAnalysisCore;
