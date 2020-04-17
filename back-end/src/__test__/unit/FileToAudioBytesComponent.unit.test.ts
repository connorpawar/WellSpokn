
const fs = require('fs')

jest.mock('fluent-ffmpeg')
jest.mock('fs')

import FileToAudioBytesComponent from '../../analysis/FileToAudioBytesComponent';

describe('FileToAudioBytesComponent class', () => {
  var Ffmpeg = require('fluent-ffmpeg')

  test('GoogleCloudData standardizeFileName works', async (done) => {
    var component = new FileToAudioBytesComponent();
    var filename_wav = "file.wav"
    var filename_mp3 = "file.mp3"
    var filename_ogg = "file.ogg"
    var filename_opus = "file.opus"

    var filename_wav_standardized = "file_standardized.wav"

    expect(component.standardizeFileName(filename_mp3)).toEqual(filename_wav_standardized)
    expect(component.standardizeFileName(filename_ogg)).toEqual(filename_wav_standardized)
    expect(component.standardizeFileName(filename_opus)).toEqual(filename_wav_standardized)
    expect(component.standardizeFileName(filename_wav)).toEqual(filename_wav_standardized)
    done();
  });

  test('FileToAudioBytesComponent analyze works', async (done) => {
    var component = new FileToAudioBytesComponent();
    var dummyFilename = "example.mp3";
    var newDummyFilename = "example_standardized.wav";
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
            return "You got the bytedata"
          }
      })
    }

    Ffmpeg.mockImplementation(() => { return ffmpegMock; });
    fs.readFileSync = fastMock((arg) =>{
      if(newDummyFilename==arg){
        return fileMock;
      }else{
        fail("Filename is incorrect in fs.readFileSync");
      }
    });
    

    var actualReturnVal = await component.analyze({audioFile:dummyFilename})

    expect(ffmpegMock.input).toBeCalledWith(dummyFilename)
    expect(ffmpegMock.audioChannels).toBeCalledWith(1)
    expect(ffmpegMock.output).toBeCalledWith(newDummyFilename)
    expect(ffmpegMock.run).toBeCalled()
    expect(actualReturnVal).toEqual("You got the bytedata")

    done();
  });
});