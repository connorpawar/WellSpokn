const express = require('express');
const bcrypt = require('bcryptjs');

import sql from '../database/sql';
import passport from '../middleware/passport';

const loginPageRoute = '/login' //TODO: Determine a target
const mainPageRoute = '/'


export const AuthenticationFunction = function (req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect(loginPageRoute)
    }
}

var Router = express.Router();

Router.post('/register', async function (req, res) {
    const json_data = req.body
    var email = json_data.email
    var firstname = json_data.firstName
    var lastname = json_data.lastName
    var raw_password = json_data.password    
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(raw_password,salt, (err,hashed_password) =>{
            if(err){
                console.log(err);
            }
            sql.registerUser(email,firstname,lastname,hashed_password)
            .then(() =>{
                res.send("User Registered");
            }).catch(() => {
                res.send("Registration Failed");
            })
        })
    })
});

Router.post('/login', passport.authenticate('local', {failureRedirect : loginPageRoute}), function (req, res) {
    res.send(req.sessionID)
});

Router.post('/logout', AuthenticationFunction, function (req, res) {
    var deletedID = req.sessionID;
    req.logout();
    res.send(deletedID)
});

Router.get('/whoami', AuthenticationFunction,  function (req, res) {
    res.send(req.user.email);
});


export default Router;
