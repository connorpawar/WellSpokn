import AnalysisCore from '../../analysis/AnalysisCore';
import GoogleTextToSpeechComponent from '../../analysis/GoogleSpeechToTextComponent';
import GoogleNaturalLanguageComponent, {Sentiment} from '../../analysis/GoogleNaturalLanguageComponent';


describe('Can send file to Google Cloud', () => {  
  test('GoogleCloudData replaceExtension works', async (done) => {
    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new GoogleSpeechToTextComponent())
    analysisCore.addAnalysisComponent<Sentiment>(new GoogleNaturalLanguageComponent())
    var initialData = {"audioFile" : "./files/loveChocolate"};

    analysisCore.intialize("audioFile",initialData).then((allData : any) => {
      
      done();
    })
  });
})