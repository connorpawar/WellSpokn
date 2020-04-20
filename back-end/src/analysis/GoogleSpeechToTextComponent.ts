
import { AnalysisComponent } from "./AnalysisComponent"

const speech : any = require('@google-cloud/speech');

class GoogleSpeechToTextComponent extends AnalysisComponent<string>{
  speechClient = new speech.SpeechClient();
  inputTopic = new Set(["audioBytes"]);
  outputTopic = "transcript";

  analyze(data: Object) : Promise<string>{
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
          const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
          resolve(transcription)
        });
      })
    });
  }
}

export default GoogleSpeechToTextComponent;
