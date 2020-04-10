import GoogleNaturalLanguageComponent from '../../analysis/GoogleNaturalLanguageComponent';
const sentimentData = require("./mockdata/sentiment")


function resolveWrap(arg){
  return new Promise((resolve,reject) =>{
      resolve(arg)
  })
}

describe('GoogleNaturalLanguageComponent class', () => {
  test('GoogleNaturalLanguageComponent analyze works', async (done) => {
    var expectedReturn = sentimentData;
    const inputData = {
      transcript : "I hate coconut flavored foods. I prefer chocolate flavored things. In fact, I love pizza, especially cheese and sausage pizza."
    }
    const documentOptions = {
      content: inputData.transcript,
      type: 'PLAIN_TEXT',
    };

    var component = new GoogleNaturalLanguageComponent();
    component.languageClient.analyzeSentiment = jest.fn(
      (opt) => {
        if(opt.document.content == inputData.transcript && opt.document.type == 'PLAIN_TEXT'){
          return resolveWrap(expectedReturn)
        }else{
          fail("Options not correct")
        }
      }
    );

    var componentReturn = await component.analyze(inputData)
    expect(componentReturn[0].documentSentiment).toEqual(expectedReturn[0].documentSentiment)
    
    done();
  });
});