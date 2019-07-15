const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 

const companySchema = new Schema({
    name:{
        type:String,
        // unique:true,
        lowercase:true,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    // jobs:[mongoose.Schema.Types.ObjectId],


})

module.exports = mongoose.model('Company',companySchema)