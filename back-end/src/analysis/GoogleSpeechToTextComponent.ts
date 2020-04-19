
import { AnalysisComponent } from "./AnalysisComponent"
import HzComponent from "./HzComponent";

const speech : any = require('@google-cloud/speech');
const {Storage} = require('@google-cloud/storage');

class GoogleSpeechToTextComponent extends AnalysisComponent<string>{
  speechClient = new speech.SpeechClient();
  storage = new Storage();
  inputTopic = new Set(["convertedFile","hz"]);
  outputTopic = "transcript";
  BUCKET_NAME = "audio_files_wellspokn";

  
  uploadFile(filename) {
    return new Promise((resolve,reject) =>{
      this.storage.bucket(this.BUCKET_NAME).upload(filename, {
        gzip: true,
      }).then(uploadJson =>{
        //TODO: if can be less hacky, do so.
        var gsUri = "gs://audio_files_wellspokn/" + uploadJson[0].metadata.name
        resolve(gsUri)
      }).catch(err =>{
        reject(err)
      });
    })
  }

  analyze(data: Object) : Promise<string>{
    var convertedFile = data["convertedFile"];
    var hz = data["hz"]
    return new Promise((resolve,reject) => {

      this.uploadFile(convertedFile).then(gcsUri =>{
        const audio = {
          uri: gcsUri,
        };
        const config = {
          encoding: "LINEAR16",
          sampleRateHertz : hz,
          languageCode: 'en-US',
          enableAutomaticPunctuation: true,
        };
        const request = {
          audio: audio,
          config: config,
        };

        this.speechClient.longRunningRecognize(request).then(recongizeReturn =>{
          var operation = recongizeReturn[0];
          operation.promise().then(operationReturn =>{
            var response = operationReturn[0]
            const transcription = response.results
              .map(result => result.alternatives[0].transcript)
              .join('\n');
            resolve(transcription)
          });
        })
      })
    });
  }
}

export default GoogleSpeechToTextComponent;
