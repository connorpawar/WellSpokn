
import { AnalysisComponent } from "./AnalysisComponent"

const speech : any = require('@google-cloud/speech');

class GoogleTextToSpeechComponent extends AnalysisComponent<string>{
  speechClient = new speech.SpeechClient();
  inputTopic = new Set("audioBytes");
  outputTopic = "transcript";

  analyze(audioBytes : string) : Promise<string>{
    return new Promise((resolve,reject) => {
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
      this.speechClient.recognize(request).then(response => {
        var [transcriptParts] = response
        const transcription = transcriptParts.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        resolve(transcription)
      })
    });
  }
}

export default GoogleTextToSpeechComponent;
