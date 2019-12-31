const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const https = require('https')


import Router from 'routes/routes';

const app = express();
const port = 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

//TODO: Is this okay?
app.use("/api",Router) 
app.use("/",Router)

app.listen(8080)