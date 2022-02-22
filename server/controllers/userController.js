const ecovian = require('../models/ecovians') ;
const jwt = require('jsonwebtoken') ;

//Controller for user SignUp
module.exports.signup = async function(req,res){
    console.log("A SignUp Req recieved") ;
    console.log(req.body) ; 
    const {name , email , password ,contact,city,state,country,addr} = req.body ; 
    let user = await ecovian.findOne({
        email : email
    }) ;
    if(!user){
        //create user
        let newUser = await ecovian.create({
            name : name , 
            email : email , 
            password : password , 
            contact : contact , 
            city : city , 
            state : state,
            country : country , 
            address : addr ,
            inventoryStore : [] 
        }) ;


        if(newUser){
               return res.json(200 , {
                   data : {
                       success : true ,
                       error : null 
                   }
               }) ;          
        }
        else{
           // return that internal server error
            return res.json(500 , {
                data : {
                    success : false ,
                    message : 'Internal Server Error/Unable to Signup'
                }
            }) ;
        }
    }else{
        //user exist
        return res.json(200 , {
            data : {
                success : false ,
                message : 'This email is already in use'
            }
        }) ;
    }
}



//Controller for user login
module.exports.login = async function(req,res){
    console.log("A req recieved") ;
    console.log(req.body) ; 
    const { email , password}  = req.body ;
    let user = await ecovian.findOne({email : email}) ;
    if(!user || user.password != password){
        return res.json(400 , {
            data : {
                success : false ,
                message : "Invalid email/password"
            }
        }) ;
    } 
    const token = jwt.sign(user.toJSON(), 'ecovianInventoryStore' , { expiresIn: '2h' }) ;
    return res.json(200 , {
            data : {
                success : true ,
                token : token,
                user : user ,
                message : "Login Successful" , 
            }
    }) ;
    
  
}
