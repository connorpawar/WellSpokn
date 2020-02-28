import AnalysisCore from '../../analysis/AnalysisCore';
import FileToAudioBytesComponent from '../../analysis/FileToAudioBytesComponent';
import GoogleSpeechToTextComponent from '../../analysis/GoogleSpeechToTextComponent';
import GoogleNaturalLanguageComponent, {Sentiment} from '../../analysis/GoogleNaturalLanguageComponent';

var fs = require("fs")

describe('Can send file to Google Cloud', () => {  
  test('GoogleCloudData replaceExtension works', async (done) => {
    fs.unlink = jest.fn();

    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new FileToAudioBytesComponent())
    analysisCore.addAnalysisComponent<string>(new GoogleSpeechToTextComponent())
    analysisCore.addAnalysisComponent<Sentiment>(new GoogleNaturalLanguageComponent())
    var initialData = {"audioFile" : "src/__test__/integration/files/loveChocolate.wav"};

    analysisCore.intialize("audioFile",initialData).then((allData) => {
      console.log(allData)
      done();
    }).catch(e =>{
      fail(e)
    })
  });
})