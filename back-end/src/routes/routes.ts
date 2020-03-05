const express = require('express');


import sql from '../database/sql';
import generateAnalysisCore from '../analysis/Analysis';
import storage, { Storage } from '../storage';

//Initializations
sql.softInitialize();
Storage.initializeFolder();

const upload = storage

var Router = express.Router();

Router.get('/',  function (req, res) {
    res.send("Backend Is Up")
});

Router.post('/register',  function (req, res) {
    const json_data = req.body
    var email = json_data.email
    var username = json_data.username
    var raw_password = json_data.password
    //TODO: Hash password for authenitication
    var hashed_password = raw_password
    sql.registerUser(username,hashed_password,email)
    .then(() =>{
        res.send("YES YES YES");
    }).catch(() => {
        //TODO: Properly make an error
        res.send("NO NO NO");
    })
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

Router.post('/login',  function (req, res) {
    const json_data = req.body
    var username = json_data.username
    var raw_password = json_data.password
    var hashed_password = raw_password //TODO: Add hashing and authentication here.

    sql.getUser(username)
    .then(u => {
        if (u.password == hashed_password){
            //TODO: What to do if authentication succeeds

        }else{
            //TODO: What to do if authentication fails
        }
    })
});

Router.post('/logout',  function (req, res) {
    const json_data = req.body
    var token = json_data.token
    //TODO: Authentcation stuff
});

Router.get('/speech_previews',  function (req, res) {
    const json_data = req.body
    var username = json_data.username
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
