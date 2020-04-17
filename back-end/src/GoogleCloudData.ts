const fs = require('fs');
const path = require('path')
const Ffmpeg = require('fluent-ffmpeg')

class GoogleCloudData{
  private _transcript: string = "N/A"

  constructor(){

  }

  replaceExtension(fileName) : string{
    var fileNameExt : string = path.parse(fileName).ext;
    fileName.replace("."+fileNameExt,"");
    fileName += ".wav";
    return fileName;
  }

  async init(fileName) : Promise<string>{
    return new Promise((resolve,reject) => {
      var newFileName : string = this.replaceExtension(fileName);
      var command = new Ffmpeg()
        .input(fileName)
        .audioChannels(1)
        .output(newFileName)
        .on('end', function(){
          resolve("This is the greatest speech ever. It should always work.")
        })
        .on('error', e => {
          reject(e)
        });
      command.run()
    });
  }

  get Transcript(): string{
    return this._transcript
  }
  set Transcript(new_transcript: string){
    this._transcript = new_transcript;
  }
}
module.exports=GoogleCloudData;

/*
//EXAMPLE USAGE
var k = new GoogleCloudData()
k.init("./23de671c9994cb999a1cb057c3aeab66").then(transcript => {
  console.log(transcript)
  console.log(k.Transcript)
}).catch( e =>{
  console.log(e)
});
*/