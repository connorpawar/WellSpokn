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
            console.log(speech)
            sql.finalizeAttempt(sid).then(() =>{
                getSpecificSpeech(res,uid,sid)
            })
        });
    }).catch( e =>{
        console.log(e)
    })   
}

Router.post('/dev_speech/:sid?',  (req, res) => {
    const json_data = req.body
    var email = req.user.email
    var title = json_data.title
    var transcript = json_data.transcript
    var sid = req.params.sid
    var promise
    if(sid){
        promise = sql.upsertSpeech(email,title,transcript,sid)
    }else{
        promise = sql.upsertSpeech(email,title,transcript)
    }

    promise.then(s =>{
        dummyDataPopulation(req,res,s)
    }).catch(e => {
        console.log(e)
        res.send("Speech could not be created.");
    })
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
            
            //TODO Modifiy thresholds as needed.
            if(allData.wordsPerMinute > 150){
                promises.concat(sql.addError(id, "Speed", 0, 0, "Your words per minute is " + allData.wordsPerMinute + ". Your words per minute should be at most 160 for presentations."));
            }else if(allData.wordsPerMinute < 100){
                promises.concat(sql.addError(id, "Speed", 0, 0, "Your words per minute is " + allData.wordsPerMinute + ". Your words per minute should be at least 100 for presentations."));
            }
            
            //TODO Modifiy thresholds as needed.
            var sentimentScore = allData.sentiment[0].documentSentiment.score;
            if(allData.sentiment[0].documentSentiment.score > 0.5){
                promises.concat(sql.addError(id, "Sentiment", 0, 0, "Your sentiment score is " + sentimentScore + ". This means you had mostly positive things to say; this being emotionally positive a goal of your speech?"));
            }else if(allData.sentiment[0].documentSentiment.score < -0.5){
                promises.concat(sql.addError(id, "Sentiment", 0, 0, "Your sentiment score is " + sentimentScore + ". This means you had mostly negative things to say; this being emotionally negative a goal of your speech?"));
            }

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
