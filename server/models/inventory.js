const mongoose = require('mongoose') ;

const inventory_schema = new mongoose.Schema({
    name : {
        type : String , 
        required : true 
    } , 
    address : {
        type : String , 
        required : true 
    },
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
    totalItemPresent : {
        type : Number , 
        required: true 
    },
    totalItemMovedOut : {
        type : Number , 
        required: true 
    },
    damaged : {
        type : Array , 
        required : true 
    } ,
    ready : {
        type : Array , 
        required : true 
    } ,
    repair : {
        type : Array , 
        required : true 
    } 
}) ;

const inventory = mongoose.model('inventory' , inventory_schema) ;
module.exports = inventory ; 