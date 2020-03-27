import sql from '../database/sql';

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(
    new Strategy(
        async function(username, password, cb) {
            try{
                var user = await sql.getUser(username)
    
                if(!user){
                    return cb(null,false)
                }
    
                if(user.password == password){
                    return cb(null,user)
                }
            }catch(e){
                return cb(e)
            }
        }
    )
);
  
passport.serializeUser(function(user, cb) {
    cb(null, user.username);
});
passport.deserializeUser(
    async function(username, cb) {
        try{
            var user = await sql.getUser(username)
            return cb(null,user)
        }catch(e){
            return cb(e)
        }
    }
});