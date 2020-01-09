const Multer = require('multer')
const fs = require('fs')
const path = require('path')


export class Storage {
    static uploadDir : string = path.join(__dirname,'uploads')

    static emptyFolder(){
        fs.readdirSync(this.uploadDir).forEach( (file) => {
            var unlinkThis = path.join(this.uploadDir,file)
            fs.unlink(unlinkThis, () => {})
        })
    }
    static initializeFolder(){
        if (!fs.existsSync(this.uploadDir)){
            fs.mkdirSync(this.uploadDir)
        }else{
            Storage.emptyFolder()
        }
    }
};


const upload = Multer({dest : Storage.uploadDir})

export default upload;