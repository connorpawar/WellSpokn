const express = require('express');

import sql from '../database/sql';
import generateAnalysisCore from '../analysis/Analysis';
import storage, { Storage } from '../storage';

//Initializations
sql.softInitialize();
Storage.initializeFolder();

const upload = storage

var Router = express.Router();

function getSpecificSpeech(res, uid, sid){
    sql.getSpecificSpeech(uid,sid).then(data => {
        res.send(data)
    }).catch(e =>{
        res.send(e)
    })
}

Router.get('/speech/:id',  function (req, res) {
    var userId = req.user.id
    var speechId = req.params.id
    getSpecificSpeech(res,userId,speechId)
});

//TODO: Put in dev mode again later.
function dummyDataPopulation(req,res,speech){
    var sid = speech.id
    var uid = speech.user_id
    var initialData = {"transcript" : speech.transcript};
    var promises = []
    var analysisCore = generateAnalysisCore()
    analysisCore.intialize("transcript",initialData).then(async (allData : any) => { 
        console.log(allData)  
        for(var x of allData.languageToolErrors.matches){
            var err = sql.addError(sid, x.rule.category.name, x.context.offset, x.context.offset + x.context.length, x.rule.description);
            promises.concat(err)
        }
        Promise.all(promises).then(()=>{
            sql.finalizeAttempt(sid).then(() =>{
                getSpecificSpeech(res,uid,sid)
            })
        });
    }).catch( e =>{
        console.log(e)
    })   
}

function SpeechPlacement(req, res) {
    const json_data = req.body
    var email = req.user.email
    var title = json_data.title
    var transcript = json_data.transcript
    
    sql.createSpeech(email,title,transcript)
    .then(s =>{
        dummyDataPopulation(req,res,s)
    }).catch(() => {
        res.send("Speech could not be created.");
    })
}
Router.post('/dev_speech',  SpeechPlacement);

Router.get('/speech_previews',  function (req, res) {
    var email = req.user.email
    sql.getAllSpeechesForASpecificUser(email).then(data => {
        res.send(data)
    }).catch(e =>{
        res.send(e)
    })
});

Router.post('/speech', upload.single('audio'), async (req,res) =>{
    const json_data = req.body
    var initialData = {"audioFile" : req.file.path};
    var email = req.user.email
    var title = json_data.title
    console.log(email,title,initialData)
    var analysisCore = generateAnalysisCore()
    analysisCore.intialize("audioFile",initialData).then((allData : any) => {    
        sql.createSpeech(email,title,allData.transcript)
        .then(s =>{
            var id = s.id
            for(var x of allData.languageToolErrors.matches){
                sql.addError(id, x.rule.category.name, x.context.offset, x.context.offset + x.context.length, x.rule.description);
            }
        })
        res.send(allData.transcript)
    }).catch( e =>{
        console.log(e)
    })
});

export default Router;
