const speech = require('@google-cloud/speech');
const language = require('@google-cloud/language');
const fs = require('fs');
const path = require('path')
const Ffmpeg = require('fluent-ffmpeg')

var speechClient = new speech.SpeechClient();
var langClient = new language.LanguageServiceClient();


//TODO: Clean up if possible
async function sendToGoogleCloud(fileName) : Promise<string>{
  return new Promise(async (resolve,reject) =>{
    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
    
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
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

class GoogleCloudData{
  private _transcript: string = "N/A"

  constructor(){

  }

  replaceExtension(fileName) : string{
    var fileNameExt : string = path.parse(fileName).ext;
    fileName.replace("."+fileNameExt,"");
    fileName += ".wav";
    return fileName;
  }

  async init(fileName) : Promise<string>{
    return new Promise((resolve,reject) => {
      var newFileName : string = this.replaceExtension(fileName);
      var command = new Ffmpeg()
        .input(fileName)
        .audioChannels(1)
        .output(newFileName)
        .on('end', function(){
          sendToGoogleCloud(newFileName).then(transcript =>{
            fs.unlink(fileName,() => {})
            fs.unlink(newFileName,() => {})
            resolve(transcript);
          });
        })
        .on('error', e => {
          fs.unlink(fileName,() => {})
          reject(e)
        });
      command.run()
    });
  }

  get Transcript(): string{
    return this._transcript
  }
  set Transcript(new_transcript: string){
    this._transcript = new_transcript;
  }

}
export default GoogleCloudData;