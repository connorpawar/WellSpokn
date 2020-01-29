jest.mock('fluent-ffmpeg')
jest.mock('@google-cloud/speech')
jest.mock('@google-cloud/language')
jest.requireActual('fs')


import GoogleCloudData from '../../analysis/GoogleCloudData';

function resolveWrap(arg){
  return new Promise((resolve,reject) =>{
      resolve(arg)
  })
}

describe('GoogleCloudData class', () => {
  var fs : any = require('fs')
  var speech = require('@google-cloud/speech');
  var language = require('@google-cloud/language');
  var Ffmpeg = require('fluent-ffmpeg')

  test('GoogleCloudData replaceExtension works', done => {
    var gcd = new GoogleCloudData();
    var filename_wav = "file.wav"
    var filename_mp3 = "file.mp3"
    var filename_ogg = "file.ogg"
    var filename_opus = "file.opus"

    expect(gcd.replaceExtension(filename_mp3)).toEqual(filename_wav)
    expect(gcd.replaceExtension(filename_ogg)).toEqual(filename_wav)
    expect(gcd.replaceExtension(filename_opus)).toEqual(filename_wav)
    expect(gcd.replaceExtension(filename_wav)).toEqual(filename_wav)
    done();
  });

  test('GoogleCloudData init works', async (done) => {
    var gcd = new GoogleCloudData();
    var dummyFilename = "example.mp3";
    var newDummyFilename = "example.wav";
    var onEnd : Function = () =>{};

    var fastMock = (func) =>{
      var mock = jest.fn();
      mock.mockImplementation(func);
      return mock;
    }

    var ffmpegMock = {
      input : fastMock(() => {return ffmpegMock}),
      audioChannels : fastMock(() => {return ffmpegMock}),
      output : fastMock(() => {return ffmpegMock}),
      on : fastMock((arg1,arg2) => {
        if(arg1 == 'end'){
          onEnd = arg2
        }
        return ffmpegMock
      }),
      run : fastMock(() => {
        onEnd()
        return ffmpegMock;
      }),
    };
    var fileMock = {
      toString : fastMock(arg => {
          if(arg != 'base64'){
            fail('not base64 conversion')
          }else{
            return "Yes!"
          }
      })
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
    var speechMock = {
      recognize: fastMock((r) => {
        return resolveWrap(resultsMock)
      })
    };


    speech.SpeechClient.mockImplementation(() => {return speechMock});
    language.LanguageServiceClient.mockImplementation(() => {}); //TODO: Test this later.
    Ffmpeg.mockImplementation(() => { return ffmpegMock; });
    fs.readFileSync = fastMock((arg) =>{
      if(newDummyFilename==arg){
        return fileMock;
      }else{
        fail("Filename is incorrect in fs.readFileSync");
      }
    });
    

    var actualReturnVal = await gcd.analyze(dummyFilename)

    expect(ffmpegMock.input).toBeCalledWith(dummyFilename)
    expect(ffmpegMock.audioChannels).toBeCalledWith(1)
    expect(ffmpegMock.output).toBeCalledWith(newDummyFilename)
    expect(ffmpegMock.run).toBeCalled()
    expect(actualReturnVal).toEqual("Why\nis\nthis\nso\nbloated?")

    done();
  });
});