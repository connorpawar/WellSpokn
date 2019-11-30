import { resolve } from "dns";

const speech = require('@google-cloud/speech');
const language = require('@google-cloud/language');
const fs = require('fs');


class GoogleCloudData{
  speechClient
  langClient
  private _transcript: string = "N/A"

  constructor(){
    this.speechClient = new speech.SpeechClient();
    this.langClient = new language.LanguageServiceClient();
  }

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
  }

  get Transcript(): string{
    return this._transcript
  }
  set Transcript(new_transcript: string){
    this._transcript = new_transcript
  }

}
module.exports=GoogleCloudData;
/* //EXAMPLE USAGE
var k = new GoogleCloudData()
k.init("./7a9335d45f651efa2f0ff0cc8e82a007").then(transcript => {
  console.log(transcript)
  console.log(k.Transcript)
})
*/
