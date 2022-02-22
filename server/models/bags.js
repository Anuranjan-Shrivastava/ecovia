const mongoose = require('mongoose') ;

const bag_schema = new mongoose.Schema({
    uuid : {
        type : String , 
        required : true 
    } , 
    size : {
        type : String , 
        required : true 
    },
    weight : {
        type : String , 
        required : true 
    } , 
    color : {
        type : String , 
        required : true 
    },
    status : {
        type : Number, 
        required : true
    } , 
    inventory : {
        type : mongoose.ObjectId , 
        required : true 
    }
} , {
    timestamps : true
}) ;

const bag = mongoose.model('bag' , bag_schema) ;
module.exports = bag ; 