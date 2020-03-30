const express = require('express');
const bcrypt = require('bcryptjs');

import sql from '../database/sql';
import generateAnalysisCore from '../analysis/Analysis';
import storage, { Storage } from '../storage';
import passport from './passport';


//Initializations
sql.softInitialize();
Storage.initializeFolder();

const upload = storage

var Router = express.Router();

Router.get('/',  function (req, res) {
    console.log(req.isAuthenticated())
    console.log(req.user)
    res.send("Backend Is Up")
});

Router.get('/no',  function (req, res) {
    res.send("No")
});

Router.post('/register', async function (req, res) {
    const json_data = req.body
    var email = json_data.email
    var username = json_data.username
    var raw_password = json_data.password
    var hashed_password = raw_password
    
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(raw_password,salt, (err,hashed_password) =>{
            if(err){
                console.log(err);
            }
            sql.registerUser(username,hashed_password,email)
            .then(() =>{
                res.send("YES YES YES");
            }).catch(() => {
                //TODO: Properly make an error
                res.send("NO NO NO");
            })
        })
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

Router.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/no',
    failureFlash: false
}));

Router.post('/logout',  passport.authenticate('local', { failureRedirect: '/no' }), function (req, res) {
    req.logout();
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
