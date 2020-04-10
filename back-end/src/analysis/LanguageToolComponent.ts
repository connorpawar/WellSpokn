import { AnalysisComponent } from "./AnalysisComponent"
import { v4 as uuid } from 'uuid';
import * as fs from 'fs'
import * as cp from 'child_process'
const path = require('path')

//TODO make this an enviroment variable
var languageToolJarPath : String = '/languagetool/languagetool-commandline.jar'

class LanguageToolComponent extends AnalysisComponent<Object>{
	inputTopic = new Set(["transcript"]);
	outputTopic = "languageToolErrors";

	analyze(data: Object) : Promise<Object>{
		var transcript : string = data["transcript"];
		var languageToolErrors : Object = {};
		var fileName = path.join("./", uuid().toString() + '.txt');
		return new Promise((resolve, reject) => {
			try{
				fs.writeFile(fileName, transcript, (err) => {
					console.log("java -jar " + languageToolJarPath + ' -l en-US --json ' + fileName)
					if (err){
						console.log(err);
						resolve(languageToolErrors);
					}
					var child = cp.spawn('java', ['-jar',languageToolJarPath, '-l', 'en-US', '--json', fileName], {});
					child.stdout.on('data', function(data){
						resolve(JSON.parse(data.toString()));
					});
				});
			}catch(e){
				console.log(e)
				reject(e)
			}
		});
	}
}

export default LanguageToolComponent;
