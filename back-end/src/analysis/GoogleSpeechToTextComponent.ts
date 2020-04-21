
import { AnalysisComponent } from "./AnalysisComponent"

const speech : any = require('@google-cloud/speech');
const {Storage} = require('@google-cloud/storage');

class GoogleSpeechToTextComponent extends AnalysisComponent<string>{
  speechClient = new speech.SpeechClient();
  storage = new Storage();
  inputTopic = new Set(["convertedFile"]);
  outputTopic = "transcript";
  BUCKET_NAME = "audio_files_wellspokn";

  
  uploadFile(filename) {
    return new Promise((resolve,reject) =>{
      this.storage.bucket(this.BUCKET_NAME).upload(filename, {
        gzip: true,
      }).then(uploadJson =>{
        //TODO: if can be less hacky, do so.
        var gsUri = "gs://"+this.BUCKET_NAME+"/" + uploadJson[0].metadata.name
        resolve(gsUri)
      }).catch(err =>{
        reject(err)
      });
    })
  }

  analyze(data: Object) : Promise<string>{
    var convertedFile = data["convertedFile"];
    return new Promise((resolve,reject) => {
      this.uploadFile(convertedFile).then(gsUri =>{
        const audio = {
          uri: gsUri,
        };
        const config = {
          encoding: "FLAC",
          sampleRateHertz : 32000,
          languageCode: 'en-US',
          model : "default"
        };
        const request = {
          audio: audio,
          config: config,
        };

        console.log(request)
        
        this.speechClient.longRunningRecognize(request).then(recongizeReturn =>{
          var operation = recongizeReturn[0];
          operation.promise().then(operationReturn =>{        
            var response = operationReturn[0]
            const transcription = response.results
              .map(result => result.alternatives[0].transcript)
              .join('\n');

            console.log(operation)
            console.log(response)
            console.log(response.results)
            console.log(JSON.stringify(response))
            resolve(transcription)
          });
        })
      })
    });
  }
}

export default GoogleSpeechToTextComponent;
