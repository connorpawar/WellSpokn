import AnalysisCore from "./AnalysisCore";
import FileConverterComponent from './FileConverterComponent'
import GoogleSpeechToTextComponent from './GoogleSpeechToTextComponent'
import GoogleNaturalLanguageComponent, {Sentiment} from './GoogleNaturalLanguageComponent'
import GoogleSyntaxComponent from './GoogleSyntaxComponent'
import WordsPerMinuteComponent from './WordsPerMinuteComponent'
import LanguageToolComponent from './LanguageToolComponent'


var c = new FileConverterComponent()
var sts = new GoogleSpeechToTextComponent()

/*

sts.analyze({convertedFile:"./output23.wav"}).then(t =>{
    console.log(t)
})

*/
//TODO: Change this to any file you need
c.analyze({audioFile:"./idontlikethis.mp3"}).then(newFile =>{
    sts.analyze({convertedFile:newFile}).then(t =>{
        console.log(t)
    })
})