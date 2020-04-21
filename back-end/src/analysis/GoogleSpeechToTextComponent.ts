
import { AnalysisComponent } from "./AnalysisComponent"

const speech : any = require('@google-cloud/speech');

class GoogleSpeechToTextComponent extends AnalysisComponent<Object>{
  speechClient = new speech.SpeechClient();
  inputTopic = new Set(["audioBytes"]);
  outputTopic = "speechToTextRet";

  analyze(data: Object) : Promise<Object>{
    var audioBytes = data["audioBytes"];
    return new Promise((resolve,reject) => {
      const audio = {
        content: audioBytes,
      };
      const config = {
        languageCode: 'en-US',
        enableWordTimeOffsets: true,
        audio_channel_count: 1,
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
          resolve(response)
        });
      })
    });
  }
}

export default GoogleSpeechToTextComponent;
