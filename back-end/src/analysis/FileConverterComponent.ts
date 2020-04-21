import { AnalysisComponent } from "./AnalysisComponent"
import { v4 as uuid } from 'uuid';
import * as cp from 'child_process'

const path = require('path')



class FileToAudioBytesComponent extends AnalysisComponent<string>{
  inputTopic = new Set(["audioFile"]);
  outputTopic = "newFile";

  standardizeFileName(fileName) : string{
    var fileNameExt : string = path.parse(fileName).ext;
    fileName = fileName.replace(fileNameExt,"");
    fileName = path.join("./", fileName+uuid().toString() + '_standardized.flac');
    return fileName;
  }

  //

  useSox(fileName) : Promise<string>{
    return new Promise((resolve,reject) => {
      var newFileName : string = this.standardizeFileName(fileName);
      try{
        var child = cp.spawn('sox', [fileName,'--rate','32k','--bits','16','-c','1',newFileName], {});
        child.stdout.on('end', function(){
          resolve(newFileName);
        });
        child.stdout.on('error', function(err){
          reject(err)
        });
      }catch(e){
        console.log(e)
        reject(e)
      }
    });

  }

  analyze(data : Object) : Promise<string>{
    var fileName = data["audioFile"];
    return this.useSox(fileName);
  }
}
export default FileToAudioBytesComponent;
