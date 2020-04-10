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

Router.get('/speech_previews',  function (req, res) {
    var email = req.user.email
    sql.getAllSpeechesForASpecificUser(email).then(data => {
        res.send(data)
    }).catch(e =>{
        res.send(e)
    })
});

Router.post('/speech/:sid?', upload.single('audio'), async (req,res) =>{
    const json_data = req.body
    var initialData = {"audioFile" : req.file.path};
    var email = req.user.email
    var title = json_data.title
    var sid = req.params.sid
    
    var analysisCore = generateAnalysisCore()

    analysisCore.intialize("audioFile",initialData).then((allData : any) => {  
        var transcript = allData.transcript;
        var promise;
        if(sid){
            promise = sql.upsertSpeech(email,title,transcript,sid)
        }else{
            promise = sql.upsertSpeech(email,title,transcript)
        }  
        promise.then(s =>{
            var promises;
            var id = s.id
            for(var x of allData.languageToolErrors.matches){
                var errPromise = sql.addError(id, x.rule.category.name, x.context.offset, x.context.offset + x.context.length, x.rule.description);
                promises.concat(errPromise);
            }
            console.log(allData)
            Promise.all(promises).then(() =>{
                sql.finalizeAttempt(id).then(() =>{
                    res.send(s)
                })
            })
        })
    }).catch( e =>{
        console.log(e)
    })
});

export default Router;
