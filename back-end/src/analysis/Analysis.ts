import AnalysisCore from "./AnalysisCore";
import FileToAudioBytesComponent from './FileToAudioBytesComponent'
import GoogleSpeechToTextComponent from './GoogleSpeechToTextComponent'
import TranscriptComponent from './TranscriptComponent'
import FindPausesComponent from './FindPausesComponent'
import GoogleNaturalLanguageComponent, {Sentiment} from './GoogleNaturalLanguageComponent'
import GoogleSyntaxComponent from './GoogleSyntaxComponent'
import RepeatAdjectiveComponent from './RepeatAdjectiveComponent'
import WordsPerMinuteComponent from './WordsPerMinuteComponent'
import LanguageToolComponent from './LanguageToolComponent'

//TODO: Is this the best place to initialize everything?
function generateAnalysisCore() : AnalysisCore{
    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new FileToAudioBytesComponent())
    analysisCore.addAnalysisComponent<Object>(new GoogleSpeechToTextComponent())
    analysisCore.addAnalysisComponent<string>(new TranscriptComponent())
    analysisCore.addAnalysisComponent<Array<any>>(new FindPausesComponent())
    analysisCore.addAnalysisComponent<Sentiment>(new GoogleNaturalLanguageComponent())
    analysisCore.addAnalysisComponent<Object>(new GoogleSyntaxComponent())
    analysisCore.addAnalysisComponent<Array<any>>(new RepeatAdjectiveComponent())
    analysisCore.addAnalysisComponent<number>(new WordsPerMinuteComponent())
    analysisCore.addAnalysisComponent<Object>(new LanguageToolComponent())
    return analysisCore
}

export default generateAnalysisCore;
