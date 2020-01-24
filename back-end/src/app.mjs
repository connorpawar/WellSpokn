import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import Router from './routes/routes.mjs';

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const env = process.env.NODE_ENV || 'development'

if (env == 'development'){
    app.use("/api",Router)
    app.listen(5000)
}
if (env == 'production'){
    app.use("/",Router)
    app.listen(8080)
}
