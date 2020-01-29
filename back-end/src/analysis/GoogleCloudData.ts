const fs = require('fs');
const path = require('path')
const Ffmpeg = require('fluent-ffmpeg')
const speech : any = require('@google-cloud/speech');
const language : any = require('@google-cloud/language');


async function sendToGoogleCloud(fileName) : Promise<string>{
  var speechClient = new speech.SpeechClient();
  var langClient = new language.LanguageServiceClient();
  return new Promise(async (resolve,reject) =>{
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
    const audio = {
      content: audioBytes,
    };
    const config = {
      languageCode: 'en-US',
      audio_channel_count: 1,
      enableAutomaticPunctuation: true,
    };
    const request = {
      audio: audio,
      config: config,
    };
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    resolve(transcription)
  })
}

class GoogleCloudData extends AnalysisComponent<string>{
  inputTopic = "audioBytes";
  outputTopic = "transcript";

  analyze = async (fileName) : Promise<String>{
    return new Promise((resolve,reject) => {
      var newFileName : String = this.replaceExtension(fileName);
      var command = new Ffmpeg()
        .input(fileName)
        .audioChannels(1)
        .output(newFileName)
        .on('end', async function(){
          var transcript : String = await sendToGoogleCloud(newFileName)
          fs.unlink(fileName,() => {})
          fs.unlink(newFileName,() => {})
          resolve(transcript);
        })
        .on('error', e => {
          fs.unlink(fileName,() => {})
          reject(e)
        });
      command.run()
    });
  }

  replaceExtension(fileName) : string{
    var fileNameExt : string = path.parse(fileName).ext;
    fileName = fileName.replace(fileNameExt,"");
    fileName += ".wav";
    return fileName;
  }


}

export default GoogleCloudData;