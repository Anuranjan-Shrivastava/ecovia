const mongoose = require('mongoose') ;

const ecovia_schema = new mongoose.Schema({
    name : {
        type : String , 
        required : true 
    } , 
    email : {
        type : String , 
        required : true 
    },
    password : {
        type : String , 
        required : true 
    } , 
    city : {
        type : String , 
        required : true 
    } , 
    state : {
        type : String , 
        required : true 
    },
    country : {
        type : String , 
        required : true 
    },
    contact : {
        type : Number , 
        required : true 
    },
    address : {
        type : String , 
        required : true 
    },
    inventoryStore : {
        type : Array , 
        required : true 
    } 
}) ;

const ecovian = mongoose.model('ecovian' , ecovia_schema) ;
module.exports = ecovian ; 