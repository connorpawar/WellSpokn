import { AnalysisComponent } from "./AnalysisComponent"
import * as fs from 'fs'
import * as cp from 'child_process'

class LanguageToolComponent extends AnalysisComponent<Object>{
	inputTopic = new Set("transcript");
	outputTopic = "languageToolErrors";

	analyze(data: Object) : Promise<Object>{
		var transcript : string = data["transcript"];
		var languageToolErrors : Object = {};
		var fileName = "src/analysis/" + Math.floor(Math.random() * 1000000000).toString() + ".txt";
		return new Promise(async (resolve, reject) => {
		fs.writeFile(fileName, transcript, (err) => {
			if (err){
				reject(err);
		  }

		  var child = cp.spawn('java', ['-jar', 'src/analysis/LanguageTool-4.7/languagetool-commandline.jar', '-l', 'en-US', '--json', fileName]);

		  child.stdout.on('data', function(data){
				//console.log("hello")
				languageToolErrors = JSON.parse(data.toString());
				//console.log(languageToolErrors)
				fs.unlink(fileName, (err) => {
					if (err){
						throw err;
					}
			  });
				resolve(languageToolErrors);
		  });
		  child.stderr.on('data', function(data){
        //console.log(data.toString())
				// fs.unlink(fileName,(err) => {
			  // 	if (err){
				// 		//console.log(err)
				// 		// throw err;
				// 	}
				// });
				// reject(data.toString())
				//resolve(languageToolErrors);
		  });
		});

		});
	}
}

export default LanguageToolComponent;
