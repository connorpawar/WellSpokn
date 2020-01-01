const Multer = require('multer')
const fs = require('fs')
const path = require('path')

const uploadDir : string = path.join(__dirname,'uploads')


export class Storage {
    static uploadDir : string = path.join(__dirname,'uploads')

    static emptyFolder(){
        fs.readdirSync(uploadDir).forEach( (file,index) => {
            var unlinkThis = path.join(uploadDir,file)
            fs.unlink(unlinkThis, () => {})
        })
    }
    static initializeFolder(){
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir)
        }else{
            Storage.emptyFolder()
        }
    }
};


const upload = Multer({dest : Storage.uploadDir})

export default upload;