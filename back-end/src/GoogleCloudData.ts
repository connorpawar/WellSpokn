
const speech = require('@google-cloud/speech');
const language = require('@google-cloud/language');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');


class GoogleCloudData{
  constructor(){
    
  }
  
  async init(fileName){
  
    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
  
    var command_promise = new Promise((resolve,reject) =>{
      ffmpeg({
        source: fileName
      }).audioChannels(1)
      .on('error',reject)
      .on('end',resolve)
      .output("out.wav")
      .run()
    }).then(() =>{
      console.log("done!")
    })
    
    /*
    const speechClient = new speech.SpeechClient();
    const langClient = new language.LanguageServiceClient();
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 44100,
      languageCode: 'en-US',
      audio_channel_count: 2,
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
    console.log(`Transcription: ${transcription}`);
    */
  }

  get Transcript(){
    return "you will never reach the truth.";
  }

}

var k = new GoogleCloudData()
k.init("./talk_about_api_here.wav")
console.log(k.Transcript)