const express = require('express');


import sql from '../models/db';
import GoogleCloudData from '../GoogleCloudData';
import storage, { Storage } from '../storage';

//Initializations
sql.softInitialize();
Storage.initializeFolder();

const upload = storage

var Router = express.Router();

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

Router.get('/speech',  function (req, res) {
    const json_data = req.body
    var username = json_data.username
    sql.getAllSpeechesForASpecificUser(username).then(data => {
        res.send(data)
    }).catch(e =>{
        res.send(e)
    })
});

Router.post('/upload_blob', upload.single('audio'), (req,res) =>{
    //req.file.path //Is the file path
    console.log("uploading blob")
    var gcloudData = new GoogleCloudData()
    gcloudData.init(req.file.path).then(transcript => {
        console.log(transcript)
        //TODO: Send the transcript to SQL
        sql.createSpeech("sc","example_title",transcript)
        res.send(transcript)
    }).catch( e =>{
        console.log(e)
    })
});

export default Router;