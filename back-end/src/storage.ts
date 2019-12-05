const Multer = require('multer')
const fs = require('fs')
const path = require('path')

const uploadDir : string = path.join(__dirname,'uploads')

function emptyFolder(){
    fs.readdirSync(uploadDir).forEach( (file,index) => {
        fs.unlink(file)
    })
}

function initializeFolder(){
    if (!path.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir)
    }else{
        emptyFolder()
    }
}

initializeFolder()
const upload = Multer({dest : uploadDir})

export default upload;