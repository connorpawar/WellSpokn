import fs from 'fs'
import path from'path'
import Ffmpeg from'fluent-ffmpeg'
import speech  from'@google-cloud/speech';
import language  from'@google-cloud/language';


async function sendToGoogleCloud(fileName){
  var speechClient = new speech.SpeechClient();
  var langClient = new language.LanguageServiceClient();
  return new Promise(async (resolve,reject) =>{
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
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

  constructor(){ this._transcript = "N/A"}

  replaceExtension(fileName){
    var fileNameExt = path.parse(fileName).ext;
    fileName = fileName.replace(fileNameExt,"");
    fileName += ".wav";
    return fileName;
  }

  async init(fileName){
    return new Promise((resolve,reject) => {
      var newFileName = this.replaceExtension(fileName);
      var command = new Ffmpeg()
        .input(fileName)
        .audioChannels(1)
        .output(newFileName)
        .on('end', async function(){
          var transcript = await sendToGoogleCloud(newFileName)
          fs.unlink(fileName,() => {})
          fs.unlink(newFileName,() => {})
          resolve(transcript);
        })
        .on('error', e => {
          fs.unlink(fileName,() => {})
          reject(e)
        });
      command.run()
    });
  }

	async sentiment(transcript){
		try {
			const document = {
				content: transcript,
				type: 'PLAIN_TEXT',
			};
		    var langClient = new language.LanguageServiceClient();

			// Detects the sentiment of the document
			const [result] = await langClient.analyzeSentiment({document});

			const sentiment = result.documentSentiment;
			console.log(`Document sentiment:`);
			console.log(`  Score: ${sentiment.score}`);
			console.log(`  Magnitude: ${sentiment.magnitude}`);

			const sentences = result.sentences;
			sentences.forEach(sentence => {
				console.log(`Sentence: ${sentence.text.content}`);
				console.log(`  Score: ${sentence.sentiment.score}`);
				console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
			});
			resolve(sentiment)
		} catch (e) {
			console.log(e);
		} finally {

		}

	}

  	async syntax(transcript){
  		try {
  			const document = {
  				content: transcript,
  				type: 'PLAIN_TEXT',
  			};
  		    var langClient = new language.LanguageServiceClient();

			const [syntax] = await langClient.analyzeSyntax({document});

			console.log('Tokens:');
			syntax.tokens.forEach(part => {
			  console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
			  console.log(`Morphology:`, part.partOfSpeech);
			});

  			resolve(syntax)
  		} catch (e) {
  			console.log(e);
  		} finally {

  		}

  	}

  get Transcript(){
    return this._transcript
  }
  set Transcript(new_transcript){
    this._transcript = new_transcript;
  }

}
export default GoogleCloudData;
