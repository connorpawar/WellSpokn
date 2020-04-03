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

function loginFunction (req, res) {
    var response_json = {
        status:"success",
        token: req.sessionID,
        userid : req.user.id,
        user_name : req.user.email
    }
    res.send(response_json)
}

Router.post('/register', function (req, res, next) {
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
                next();
            }).catch(() => {
                res.send("Registration Failed");
            })
        })
    })
},passport.authenticate('local', {failureRedirect : loginPageRoute}),loginFunction);

Router.post('/login', passport.authenticate('local', {failureRedirect : loginPageRoute}), loginFunction);

Router.post('/logout', AuthenticationFunction, function (req, res) {
    var deletedID = req.sessionID;
    req.logout();
    res.send("success")
});

Router.get('/whoami', AuthenticationFunction,  function (req, res) {
    res.send(req.user.email);
});


export default Router;
