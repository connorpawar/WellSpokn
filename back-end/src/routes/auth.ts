const express = require('express');
const bcrypt = require('bcryptjs');

import sql from '../database/sql';
import passport from '../middleware/passport';


export const AuthenticationFunction = function (req, res, next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect('/login')
    }
}

var Router = express.Router();

Router.post('/register', async function (req, res) {
    const json_data = req.body
    var email = json_data.email
    var username = json_data.username
    var raw_password = json_data.password    
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(raw_password,salt, (err,hashed_password) =>{
            if(err){
                console.log(err);
            }
            sql.registerUser(username,hashed_password,email)
            .then(() =>{
                res.send("User Registered");
            }).catch(() => {
                //TODO: Properly make an error
                res.send("Registration Failed");
            })
        })
    })
});

Router.post('/login', passport.authenticate('local', {
    successRedirect : '/', //TODO: Determine a target
    failureRedirect : '/login',
    failureFlash: false
}));

Router.post('/logout', AuthenticationFunction, function (req, res) {
    req.logout();
});

export default Router;
