const express = require('express');

import sql from '../database/sql';
import generateAnalysisCore from '../analysis/Analysis';
import storage, { Storage } from '../storage';

//Initializations
sql.softInitialize();
Storage.initializeFolder();

const upload = storage

var Router = express.Router();

Router.get('/speech/:id',  function (req, res) {
    var userId = req.user.id
    var speechId = req.params.id
    sql.getSpeechDataById(userId,speechId).then(data => {
        res.send(data)
    }).catch(e =>{
        res.send(e)
    })
});

//TODO: should be removed?
/*
function SpeechPlacement(req, res) {
    const json_data = req.body
    var email = req.user.email
    var title = json_data.title
    var transcript = json_data.transcript
    sql.createSpeech(email,title,transcript)
    .then(s =>{
        res.send({id:s.id});
    }).catch(() => {
        res.send("Speech could not be created.");
    })
}
Router.post('/speech',  SpeechPlacement);
*/

Router.get('/speech_previews',  function (req, res) {
    var email = req.user.email
    sql.getAllSpeechesForASpecificUser(email).then(data => {
        res.send(data)
    }).catch(e =>{
        res.send(e)
    })
});

Router.post('/speech', upload.single('audio'), (req,res) =>{
    //req.file.path //Is the file path
    console.log(req.file)
    const json_data = req.body
    var initialData = {"audioFile" : req.file.path};
    var email = req.user.email
    var title = json_data.title
    var analysisCore = generateAnalysisCore()
    analysisCore.intialize("audioFile",initialData).then((allData : any) => {    
        sql.createSpeech(email,title,allData.transcript)
        //TODO Uncomment when languageTool is better configured for a production env
        /*
        .then(s =>{
            var id = s.id
            for(var x of allData.languageToolErrors.matches){
                sql.addError(id, x.rule.category.name, x.context.offset, x.context.offset + x.context.length, x.rule.description);
            }
        })
        */
        res.send(allData.transcript)
    }).catch( e =>{
        console.log(e)
    })
});

export default Router;
