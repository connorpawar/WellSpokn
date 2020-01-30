import { AnalysisComponent } from "./AnalysisComponent"

const fs = require('fs');
const path = require('path')
const Ffmpeg = require('fluent-ffmpeg')

class FileToAudioBytesComponent extends AnalysisComponent<string>{
  inputTopic = new Set("audioFile");
  outputTopic = "audioBytes";

  replaceExtension(fileName) : string{
    var fileNameExt : string = path.parse(fileName).ext;
    fileName = fileName.replace(fileNameExt,"");
    fileName += ".wav";
    return fileName;
  }s

  analyze(data : Object) : Promise<string>{
    var fileName = data["audioFile"];
    return new Promise((resolve,reject) => {
      var newFileName : String = this.replaceExtension(fileName);
      var command = new Ffmpeg()
        .input(fileName)
        .audioChannels(1)
        .output(newFileName)
        .on('end', async function(){
          const file = fs.readFileSync(newFileName);
          const audioBytes = file.toString('base64');
          fs.unlink(fileName,() => {})
          fs.unlink(newFileName,() => {})
          resolve(audioBytes);
        })
        .on('error', e => {
          fs.unlink(fileName,() => {})
          reject(e)
        });
      command.run()
    });
  }



}
export default FileToAudioBytesComponent;
