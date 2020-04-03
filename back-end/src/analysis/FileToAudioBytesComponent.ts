import { AnalysisComponent } from "./AnalysisComponent"

const fs = require('fs');
const path = require('path')
const Ffmpeg = require('fluent-ffmpeg')

class FileToAudioBytesComponent extends AnalysisComponent<string>{
  inputTopic = new Set(["audioFile"]);
  outputTopic = "audioBytes";

  standardizeFileName(fileName) : string{
    var fileNameExt : string = path.parse(fileName).ext;
    fileName = fileName.replace(fileNameExt,"");
    fileName += "_standardized.wav";
    return fileName;
  }


  useFfmpeg(fileName) : Promise<string>{
    return new Promise((resolve,reject) => {
      var newFileName : String = this.standardizeFileName(fileName);
      var command = new Ffmpeg()
        .input(fileName)
        .audioChannels(1)
        .output(newFileName)
        .on('end', async function(){
          const file = fs.readFileSync(newFileName);
          const audioBytes = file.toString('base64');
          //TODO: figure out why unlinking happens prematurely.
          //fs.unlink(fileName,() => {})
          //fs.unlink(newFileName,() => {})
          resolve(audioBytes);
        })
        .on('error', e => {
          //TODO: figure out why unlinking happens prematurely.
          //fs.unlink(fileName,() => {})
          reject(e)
        });
      command.run()
    });

  }

  analyze(data : Object) : Promise<string>{
    var fileName = data["audioFile"];
    var fileNameExt : string = path.parse(fileName).ext;
    if(fileNameExt != ".wav"){
      return this.useFfmpeg(fileName);
    }else{
      const file = fs.readFileSync(fileName);
      const audioBytes = file.toString('base64');
      fs.unlink(fileName,() => {})
      return Promise.resolve(audioBytes)
    }
  }
}
export default FileToAudioBytesComponent;
