const Job = require('../models/jobs')
const Company = require('../models/company')
const NodeGeocoder = require('node-geocoder');
const config = require('../config')


const getAllJobs = async (req,res,next) => {
   try{
    const getJobs =  await Job.find({})
  
res.status(200).send(getJobs)
   }  catch(error){
       next(error,'fffffffffffffffffffffff')
   }
   
}
const getJobsByLocation = (req,res,next) => {
    // console.log(res.body,'$$$$$$$$$')
    
    let options = {
        provider: 'google',
       
       
        httpAdapter: 'https', 
        apiKey: config.GOOGLE.API_KEY, 
        formatter: 'json'         
      };
    
      let geocoder = NodeGeocoder(options);
   
        geocoder.geocode(req.params.jobLocation)
  .then((geo) => {
   
           Job.aggregate().near({ 
            near: 
            {
             'type': 'Point',
              'coordinates': [Number(geo[0].longitude), Number(geo[0].latitude)] }, 
              maxDistance: 10000, 
              spherical: true, 
              distanceField: "dis" 
             })
             .then((jobs) => {
                 
                 if(jobs.length === 0){
                    
                    throw new error({ 
                        message: "no jobs in this area! try incresing the raduis",
                        status: 404
                });
                    
                 }
               else{
                 res.status(200).send(jobs)
               }
               
             })
             .catch(function(err) {
                console.log(err);
              });
    
  })
 
}




// const addJob = (req,res,next) => {

// Job.create(req.body).then((job) => {
// res.status(201).send(job)
// })
// .catch(err => next(err))

// }



const jobRoleStatus = async (req,res,next) => {
      try {
          console.log(req.params.job_id,'%%%%%%%%%%%%%%')
const findJobById = await Job.findById(req.params.job_id)

    console.log(findJobById,'this is it ahahahah')
    if(findJobById.live === false){
        const changeToTrue = await Job.findOneAndUpdate({ _id: req.params.job_id },{"$set":{"live":true}},{new: true})

    console.log(changeToTrue,'^^^^^^^^^^^^^^^^^^^^^^^^^^^6')
    res.send(changeToTrue)

    }
    else{
        const setToTrue = Job.findOneAndUpdate({ _id: req.params.job_id },{"$set":{"live":false}},{new: true})
        
           
            res.send(setToTrue)
       
    }

}   catch(error){
    
    next(error)
}

}



const numberOfApplicants = async (req,res,next) => {
    try{
const getJobById = await Job.findById(req.params.job_id)
const applyCount = getJobById.applcates.length

      res.send({number:applyCount})
    } catch(error){
      next(error)
    }
}


const deleteJob = async (req,res,next) => {
    try{

    
    console.log(req.body,'thsi is the body')

    const deleteJobById = await Job.findByIdAndDelete(req.params.job_id)
    
    res.send(deleteJobById)
    }  catch(error){

        next(error)
    }

}







module.exports = {getAllJobs,getJobsByLocation,jobRoleStatus,numberOfApplicants,deleteJob}