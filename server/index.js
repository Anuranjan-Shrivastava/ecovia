const express = require('express') ;
const app = express() ;
const port = 8000 ;
const cors = require('cors') ;
const db = require('./config/mongoose') ;
const passport = require('passport') ;
const passport_jwt = require('./config/passport-jwt') ; ;




//middleware 
app.use(cors({credentials: true, origin: 'https://ecovia-frontend.vercel.app'}));
app.use(express.json()) ;
app.use(express.urlencoded({
    extended : false  , 
})) ;





//giving routes
const routes = require('./routes') ;
app.use('/'  , routes) ;

app.listen(port , function(err){
    if(err){
        console.log("Error in server : " , err) ;
    }else{
        console.log("Express server is running in port : " , port ) ;
    }
})