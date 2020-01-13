jest.requireMock('fs')
jest.requireMock('fluent-ffmpeg')
jest.requireMock('@google-cloud/speech')
jest.requireMock('@google-cloud/language')

import GoogleCloudData from '../../GoogleCloudData';

describe('GoogleCloudData class', () => {
  var fs : any = require('fs')
  var speech = require('@google-cloud/speech');
  var language = require('@google-cloud/language');
  var path = require('path')
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
});