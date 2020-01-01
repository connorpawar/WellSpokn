const Multer = require('multer')
const fs = require('fs')
const path = require('path')

const uploadDir : string = path.join(__dirname,'uploads')

function emptyFolder(){
    fs.readdirSync(uploadDir).forEach( (file,index) => {
        var unlinkThis = path.join(uploadDir,file)
        fs.unlink(unlinkThis, () => {})
    })
}

export function initializeFolder(){
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir)
    }else{
        emptyFolder()
    }
}

const upload = Multer({dest : uploadDir})

export default upload;