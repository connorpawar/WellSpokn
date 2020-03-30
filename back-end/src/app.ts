const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('config');
const session = require('express-session');


import Router from './routes/routes';
import passport from './routes/passport';

const app = express();

app.use(session({ secret: 'pleasework' }));
app.use(passport.initialize())
app.use(passport.session())


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(config.get("ROOT_ROUTE"),Router)
app.listen(config.get("PORT"))