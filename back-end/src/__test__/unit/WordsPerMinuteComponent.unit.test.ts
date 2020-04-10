import WordsPerMinuteComponent from '../../analysis/WordsPerMinuteComponent';
import * as mm from 'music-metadata';

function resolveWrap(arg){
  return new Promise((resolve,reject) =>{
      resolve(arg)
  })
}

describe('WordsPerMinuteComponent class', () => {
  test('WordsPerMinuteComponent analyze works', async (done) => {
    var dataInput = {
      audioFile : "math.wav",
      transcript : "It is a trivial proof."
    };
    var metadataMock = {
      format : {
        duration : 2.0
      }
    };

    Object.defineProperty(mm,'parseFile', {
      value : jest.fn((fileName,options) => {
        if(fileName == dataInput.audioFile && options.duration == true){
          return resolveWrap(metadataMock)
        }else{
          fail("Incorrect filename")
        }
      })
    });

    var component : WordsPerMinuteComponent = new WordsPerMinuteComponent()

    var expectedWordsPerMinute = 5/2.0
    var actualWordsPerMinute = await component.analyze(dataInput);

    expect(expectedWordsPerMinute).toEqual(actualWordsPerMinute);
    done();
  });
});