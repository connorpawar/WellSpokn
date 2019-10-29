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

app.get('/',  function (req, res) {
	res.send('End points are working');
});

app.get('/create/:usr/:pw',  function (req, res) {
    const json_data = req.body
    sql.registerUser(json_data.username,json_data.password,json_data.email)
    .then(() =>{
        res.send("YES YES YES");
    }).catch(() => {
        res.send("NO NO NO");
    })
});
app.get('/create_speech',  function (req, res) {
    const json_data = req.body
    sql.createSpeech(json_data.username,json_data.title,json_data.transcript)
    .then(() =>{
        res.send("Created Speech");
    }).catch(() => {
        res.send("NOOOOO");
    })
});

app.get('/find/:usr',  function (req, res) {
    sql.getUser(req.params.usr)
    .then(u => {
        res.send(u.password)
    })
});




app.listen(port || 3000, () => console.log(`running on port ${port}!`))