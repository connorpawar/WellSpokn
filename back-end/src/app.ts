const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('config');
const session = require('express-session');


import SpeechRouter from './routes/speech';
import AuthRouter, {AuthenticationFunction} from './routes/auth';
import passport from './middleware/passport';
import getSessionStore from './middleware/sessionStore';
const app = express();

//TODO: Secret fix
app.use(session({ 
    secret: '//TODO: Get an actual secret plz.',
    store : getSessionStore(session),
    cookie: { 
        secure: "auto" 
    },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(config.get("ROOT_ROUTE"),AuthRouter)
app.use(config.get("ROOT_ROUTE"),AuthenticationFunction,SpeechRouter)
app.listen(config.get("PORT"))