const express = require('express');
const bodyParser = require('body-parser');
const sql = require('../models/db');

const app = express();
const port = 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/register',  function (req, res) {
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
        res.send("NO NO NO");
    })
});
app.post('/create_speech',  function (req, res) {
    const json_data = req.body
    var username = json_data.username
    var title = json_data.title
    var transcript = json_data.transcript
    sql.createSpeech(username,title,transcript)
    .then(() =>{
        res.send("Created Speech");
    }).catch(() => {
        res.send("NOOOOO");
    })
});

app.post('/login',  function (req, res) {
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

app.post('/logout',  function (req, res) {
    const json_data = req.body
    var token = json_data.token
    //TODO: Authentcation stuff
});

app.get('/speech',  function (req, res) {
    const json_data = req.body
    var username = json_data.username
    sql.getAllSpeechesForASpecificUser(username,res)
});





app.listen(port || 3000, () => console.log(`running on port ${port}!`))