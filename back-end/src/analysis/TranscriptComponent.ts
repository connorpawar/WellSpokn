
import { AnalysisComponent } from "./AnalysisComponent"

class TranscriptComponent extends AnalysisComponent<string>{
  inputTopic = new Set(["speechToTextRet"]);
  outputTopic = "transcript";

  analyze(data: Object) : Promise<string>{
    var speechToTextRet = data["speechToTextRet"];
    return new Promise((resolve,reject) => {
      const transcription = speechToTextRet.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      resolve(transcription);
    });
  }
}

export default TranscriptComponent;
