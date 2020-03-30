import sql from '../database/sql';

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(
    new Strategy({
            usernameField : 'username',
            passwordField : 'password'
        },
        function(username, password, cb) {
            sql.getUser(username).then(u =>{
                if(!u){
                    return cb(null,false)
                }
                bcrypt.compare(password,u.password, function(err,match){
                    if(err) throw err;
                    if(match){
                        return cb(null,u)
                    }else{
                        return cb(null,false)
                    }
                })
            }).catch(e => {
                return cb(null,false)
            })
    
        }
    )
);

//TODO: use ID instead of username
passport.serializeUser(function(user, cb) {
    cb(null, user.username);
});
passport.deserializeUser(function(username, cb) {
    sql.getUser(username).then(u =>{
        cb(null,u)
    }).catch(e =>{
        cb(e,false)
    });
});

export default passport;