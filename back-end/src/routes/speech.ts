const express = require('express');
const bcrypt = require('bcryptjs');

import sql from '../database/sql';
import generateAnalysisCore from '../analysis/Analysis';
import storage, { Storage } from '../storage';

//Initializations
sql.softInitialize();
Storage.initializeFolder();

const upload = storage

var Router = express.Router();



Router.post('/who',  function (req, res) {
    res.send(req.user.email);
});

Router.post('/speech',  function (req, res) {
    const json_data = req.body
    var username = json_data.username
    var title = json_data.title
    var transcript = json_data.transcript
    sql.createSpeech(username,title,transcript)
    .then(s =>{
        res.send({id:s.id});
    }).catch(() => {
        //TODO: Properly make an error
        res.send("NOOOOO");
    })
});

Router.get('/speech_previews',  function (req, res) {
    const json_data = req.body
    var username = req.user
    sql.getAllSpeechesForASpecificUser(username).then(data => {
        res.send(data)
    }).catch(e =>{
        res.send(e)
    })
});

Router.post('/upload_speech', upload.single('audio'), (req,res) =>{
    //req.file.path //Is the file path
    var initialData = {"audioFile" : req.file.path};
    var analysisCore = generateAnalysisCore()
    analysisCore.intialize("audioFile",initialData).then((allData : any) => {
        sql.createSpeech("sc","example_title",allData.transcript)
		for(var x of allData.languageToolErrors.matches){
			sql.addError(1234, x.rule.category.name, x.context.offset, x.context.offset + x.context.length, x.rule.description);
		}
        res.send(allData.transcript)
    }).catch( e =>{
        console.log(e)
    })
});

export default Router;
