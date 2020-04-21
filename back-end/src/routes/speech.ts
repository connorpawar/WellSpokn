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
            var promises = [];
            var id = s.id

            //TODO Modifiy thresholds as needed.
            if(allData.wordsPerMinute > 150){
                promises.push(sql.addError(id, "Tempo", 0, 0, "Your words per minute is " + allData.wordsPerMinute + ". Your words per minute should be at most 160 for presentations. If you are around this speed, consider slowing down."));
            }else if(allData.wordsPerMinute < 100){
                promises.push(sql.addError(id, "Tempo", 0, 0, "Your words per minute is " + allData.wordsPerMinute + ". Your words per minute should be at least 100 for presentations. If you are around this speed, consider speeding up."));
            }

            //TODO Modifiy thresholds as needed.
            var sentimentScore = allData.sentiment[0].documentSentiment.score;
            if(allData.sentiment[0].documentSentiment.score > 0.5){
                promises.push(sql.addError(id, "Sentiment", 0, 0, "Your sentiment score is " + sentimentScore + ". This means you had mostly positive things to say; is being emotionally positive a goal of your speech?"));
            }else if(allData.sentiment[0].documentSentiment.score < -0.5){
                promises.push(sql.addError(id, "Sentiment", 0, 0, "Your sentiment score is " + sentimentScore + ". This means you had mostly negative things to say; is being emotionally negative a goal of your speech?"));
            }

            for(var x of allData.languageToolErrors.matches){
                var errPromise = sql.addError(id, x.rule.category.name, x.offset, x.offset + x.length, x.rule.description);
                promises.push(errPromise);
            }

            for(var x of allData.repeatAdjectiveErrors){
                var errPromise = sql.addError(id, "Repeat Adjective", x.offset, x.offset + x.word.length, "You said the word " +x.word+" recently, maybe change it for with a synonym");
                promises.push(errPromise);
            }

            // for(var x of allData.pauses){
            //     var errPromise = sql.addError(id, "Pause", x.offset, x.offset + 1, "Paused for " + x.duration+ " amount of time");
            //     promises.push(errPromise);
            // }

            Promise.all(promises).then(() =>{
                sql.finalizeAttempt(id).then(() =>{
                    getSpecificSpeech(res,s.user_id,s.id)
                })
            })
        })
    }).catch( e =>{
        console.log(e)
    })
});



Router.post('/speech_fix/:sid?', upload.single('audio'), async (req,res) =>{
    var transcript = req.body.transcript
    var initialData = {"transcript" : transcript};
    var email = req.user.email
    var sid = req.params.sid

    var analysisCore = generateAnalysisCore()

    analysisCore.intialize("transcript",initialData).then((allData : any) => {
        var promise;
        promise = sql.changeTranscript(email,transcript,sid)
        promise.then(s =>{
            var promises = [];
            var id = s.id

            //Error uploading is not quite unique. Refactor later.
            var sentimentScore = allData.sentiment[0].documentSentiment.score;
            if(allData.sentiment[0].documentSentiment.score > 0.5){
                promises.push(sql.addError(id, "Sentiment", 0, 0, "Your sentiment score is " + sentimentScore + ". This means you had mostly positive things to say; is being emotionally positive a goal of your speech?"));
            }else if(allData.sentiment[0].documentSentiment.score < -0.5){
                promises.push(sql.addError(id, "Sentiment", 0, 0, "Your sentiment score is " + sentimentScore + ". This means you had mostly negative things to say; is being emotionally negative a goal of your speech?"));
            }

            for(var x of allData.languageToolErrors.matches){
                var errPromise = sql.addError(id, x.rule.category.name, x.offset, x.offset + x.length, x.rule.description);
                promises.push(errPromise);
            }

            for(var x of allData.repeatAdjectiveErrors){
                var errPromise = sql.addError(id, "Repeat Adjective", x.offset, x.offset + x.word.length, "You said the word " +x.word+" recently, maybe change it for with a synonym");
                promises.push(errPromise);
            }

            Promise.all(promises).then(() =>{
                sql.finalizeAttempt(id,false).then(() =>{
                    getSpecificSpeech(res,s.user_id,s.id)
                })
            })
        })
    }).catch( e =>{
        console.log(e)
    })
});

export default Router;
