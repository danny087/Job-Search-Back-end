const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const GeoSchema = new Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
})


const jobSchema = new Schema({
    jobTitle:{
        type:String,
        required:[true,'Name field is required']
    },
    location:{
        type:String,
        require:true
    },
    jobDescription:
    {
        type:String,
        
    },
    applied:false,
    companyId:String,
    created_at: {
        type: Date,
        default: Date.now
      },
    applcates:[String],
    sucessfulApplicants:[String],
    unsucessfulApplicants:[String],
    live:false,
    geometry:GeoSchema
    
    

})



module.exports = mongoose.model('Job',jobSchema)