import AnalysisCore from "./AnalysisCore";
import FfmpegFileConverterComponent from './FfmpegFileConverterComponent'
import GoogleSpeechToTextComponent from './GoogleSpeechToTextComponent'
import GoogleNaturalLanguageComponent, {Sentiment} from './GoogleNaturalLanguageComponent'
import GoogleSyntaxComponent from './GoogleSyntaxComponent'
import WordsPerMinuteComponent from './WordsPerMinuteComponent'
import LanguageToolComponent from './LanguageToolComponent'
import HzComponent from './HzComponent'

//TODO: Is this the best place to initialize everything?
function generateAnalysisCore() : AnalysisCore{
    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new FfmpegFileConverterComponent())
    analysisCore.addAnalysisComponent<string>(new GoogleSpeechToTextComponent())
    analysisCore.addAnalysisComponent<Sentiment>(new GoogleNaturalLanguageComponent())
    analysisCore.addAnalysisComponent<number>(new WordsPerMinuteComponent())
    analysisCore.addAnalysisComponent<number>(new HzComponent())
    analysisCore.addAnalysisComponent<Object>(new LanguageToolComponent())


    analysisCore.addAnalysisComponent<Object>(new GoogleSyntaxComponent())
    return analysisCore
}

export default generateAnalysisCore;
