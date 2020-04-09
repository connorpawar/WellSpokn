import AnalysisCore from '../../analysis/AnalysisCore';
import GoogleSpeechToTextComponent from '../../analysis/GoogleSpeechToTextComponent';
import GoogleNaturalLanguageComponent, {Sentiment} from '../../analysis/GoogleNaturalLanguageComponent';

const LoveChocolate = require('./files/LoveChoclate')

//TODO: Unskip later
describe.skip('Can send file to Google Cloud', () => {  
  test('GoogleCloudData Speech-To-Text works', async (done) => {

    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<string>(new GoogleSpeechToTextComponent())
    var initialData = {"audioBytes" : LoveChocolate};

    analysisCore.intialize("audioBytes",initialData).then((allData : any) => {
      expect(allData.transcript).toEqual("I love chocolate.")
      done();
    }).catch(e =>{
      fail(e)
    })
  });  
  test('GoogleCloudData Natural Language works', async (done) => {

    var analysisCore = new AnalysisCore();
    analysisCore.addAnalysisComponent<Sentiment>(new GoogleNaturalLanguageComponent())
    var initialData = {"transcript" : "I love chocolate."};

    analysisCore.intialize("transcript",initialData).then((allData : any) => {
      var sentimentData = allData.sentiment[0].documentSentiment
      expect(sentimentData.magnitude).toBeCloseTo(0.9)
      expect(sentimentData.score).toBeCloseTo(0.9)
      done();
    }).catch(e =>{
      fail(e)
    })
  });
})