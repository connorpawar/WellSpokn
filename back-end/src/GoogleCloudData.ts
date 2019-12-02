import { resolve } from "dns";

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
    console.log(transcription)
    resolve(transcription)
  })
}

class GoogleCloudData{
  private _transcript: string = "N/A"

  constructor(){

  }

<<<<<<< HEAD
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
            //this.Transcript = transcript //TODO: This setter actually doesn't work.
            resolve(transcript);
          });
        })
        .on('error', e => {
          reject(e)
        });
      command.run()
    });
=======
  async init(fileName) : Promise<any>{
    return new Promise(async (resolve,reject) =>{
      // Reads a local audio file and converts it to base64
      const file = fs.readFileSync(fileName);
      const audioBytes = file.toString('base64');
      
      // The audio file's encoding, sample rate in hertz, and BCP-47 language code
      const audio = {
        content: audioBytes,
      };
      const config = {
        encoding: 'OGG_OPUS',
        sampleRateHertz: 48000,
        languageCode: 'en-US',
        audio_channel_count: 1,
        enableAutomaticPunctuation: true,
      };
      const request = {
        audio: audio,
        config: config,
      };
      const [response] = await this.speechClient.recognize(request);
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
        
      this.Transcript = transcription
    })
>>>>>>> 998c2ebaf5ef839f0c7d1b0b18673938cdeaef9c
  }

  get Transcript(): string{
    return this._transcript
  }
  set Transcript(new_transcript: string){
    this._transcript = new_transcript;
  }

}
module.exports=GoogleCloudData;

/*
//EXAMPLE USAGE
var k = new GoogleCloudData()
k.init("./23de671c9994cb999a1cb057c3aeab66").then(transcript => {
  console.log(transcript)
  console.log(k.Transcript)
}).catch( e =>{
  console.log(e)
});
*/