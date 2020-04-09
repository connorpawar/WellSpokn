import { AnalysisComponent } from "./AnalysisComponent"
import * as fs from 'fs'
import * as cp from 'child_process'

const languageToolJarPath = '/languagetool/languagetool.jar'

class LanguageToolComponent extends AnalysisComponent<Object>{
	inputTopic = new Set("transcript");
	outputTopic = "languageToolErrors";

	analyze(data: Object) : Promise<Object>{
			var transcript : string = data["transcript"];
			console.log(transcript)
			var languageToolErrors : Object = {};
			var fileName = Math.floor(Math.random() * 1000000000);
			return new Promise((resolve, reject) => {
				fs.writeFile(fileName.toString() + '.txt', transcript, (err) => {

		            if (err){
						console.log(err);
						resolve(languageToolErrors);
					}
		            var child = cp.spawn('java', ['-jar',languageToolJarPath, '-l', 'en-US', '--json', 'langtool.txt']);
		            child.stdout.on('data', function(data){
						languageToolErrors = JSON.parse(data.toString())
						fs.unlink(fileName.toString() + '.txt', (err) => {
				            if (err) throw err;
				        });
						console.log(data.toString());
						resolve(languageToolErrors);
		            });
		            child.stderr.on('data', function(data){
		                console.log(data.toString());
						fs.unlink(fileName.toString() + '.txt', (err) => {
				            if (err) throw err;
				        });
						resolve(languageToolErrors);
		            });
		        });

		});
	}
}

export default LanguageToolComponent;
