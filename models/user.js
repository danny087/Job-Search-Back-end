const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    cv:{
        type:String,
       
    },
    telNum:Number,
    email:String,
    password:{
        type:String,
        minLength:10
    },
    jobsApplied:[String],
    successfulApplicant:[String]
    

})

module.exports = mongoose.model('User',userSchema)