import GoogleSpeechToTextComponent from '../../analysis/GoogleSpeechToTextComponent';

function resolveWrap(arg){
  return new Promise((resolve,reject) =>{
      resolve(arg)
  })
}

describe('GoogleCloudData class', () => {
  test('GoogleCloudData analyze works', async (done) => {
    var component = new GoogleSpeechToTextComponent();
    var MockAudioBytes = "Hi I am stub."

    var fastMock = (func) =>{
      var mock = jest.fn();
      mock.mockImplementation(func);
      return mock;
    }

    var resultsMock = [{
      results : [
        {alternatives:[{transcript:"Why"}]},
        {alternatives:[{transcript:"is"}]},
        {alternatives:[{transcript:"this"}]},
        {alternatives:[{transcript:"so"}]},
        {alternatives:[{transcript:"bloated?"}]},
      ]
    },["?"],["?"]];
    component.speechClient.recognize = fastMock((r) => {
      return resolveWrap(resultsMock)
    })

    var analyzeResult = await component.analyze({audioBytes:MockAudioBytes})

    expect(analyzeResult).toEqual("Why\nis\nthis\nso\nbloated?")

    done();
  });
});