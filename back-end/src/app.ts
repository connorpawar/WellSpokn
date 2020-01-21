const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('config');


import Router from './routes/routes';

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(config.get("ROOT_ROUTE"),Router)
app.listen(config.get("PORT"))