const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

import Router from './routes/routes';

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const env : string  = process.env.NODE_ENV || 'development'

if (env == 'development'){
    app.use("/api",Router)
    app.listen(5000)
}
if (env == 'production'){
    app.use("/",Router)
    app.listen(8080)
}
