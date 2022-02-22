const passport = require('passport') ;
const JwtStrategy = require('passport-jwt').Strategy ;
const ExtractJwt = require('passport-jwt').ExtractJwt ;
const ecoviandb = require('../models/ecovians') ;

var opts = {} ;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() ;
opts.secretOrKey = 'ecovianInventoryStore' ;

passport.use(new JwtStrategy(opts , function(jwt_payload ,done ){
    ecoviandb.findById(jwt_payload._id , function(err , user){
        if(err){
            console.log("Error At JWT startegy : " , err) ;
            return done(err , false) ;
        }
        if(user){
            return done(null , user) ;
        }else{
            return done(null , false) ;
        }
    }) 
}))

module.exports = passport ; 