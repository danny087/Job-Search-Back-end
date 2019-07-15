const Company = require("../models/company")
const Job = require('../models/jobs')
var NodeGeocoder = require('node-geocoder');
const config = require('../config')

const getAllCompanies = async (req,res,next) => {
    try{
const getAllJobs =  await Company.find({})
res.status(200).send(getAllJobs)
    }
    
catch(error){
    next(error)
    
}


}


const addCompany = async (req,res,next) => {
    
try{
    const createdCompany = await Company.create(req.body)
    res.status(201).send(createdCompany)
}
    catch(error){ 
        next(error)
    }


    }

   
   
    const addJobToCompany = (req,res,next) => {
        
        return Company.find({name:req.params.company_name})
        .then((hi) => {
            
            let options = {
                provider: 'google',
                httpAdapter: 'https', 
                apiKey: config.GOOGLE.API_KEY, 
                formatter: 'json'         
              };

//            
         let geocoder = NodeGeocoder(options);


  geocoder.geocode(req.body.location)
  .then((geo) => {
    // console.log(res,'%%%%%%%%%%%%');
    let longitude = Number(geo[0].longitude)
    let latitude = Number(geo[0].latitude)
    return Job.create({
        jobTitle:req.body.jobTitle,
        companyId:hi[0]._id,
        location:req.body.location,
        live:req.body.live,
        jobDescription:req.body.jobDescription,
        geometry:{"type":"point","coordinates":[longitude,latitude]}
      
        

    })
    .then((job) => {
        // console.log(job,'££££££')
        res.send({job})
    })
  })
  .catch(function(err) {
    console.log(err);
  });
        
        })
    }

    const getAllCompanyJobs = (req,res,next) => {
        // console.log(req.params,'$$$$$$')
        return Company.find({name:req.params.company_name})
        .then(jobs => {
            console.log(jobs)
            return Job.find({companyId:jobs[0]._id})
            .then(jobs => {
                console.log(jobs,'£££££')
                res.send({jobs})
            })
        })
    }

    // const acceptCV = (req,res,next) => {
    //     return Job.findById(req.params.job_id)
    //     .then(jobs => {
    //         console.log(jobs)
    //         jobs.applcates.map
    //     })
    // }

    const acceptCV = async  (req,res,next) => {
        try{
console.log(req.query,'^^^^^^^^^^^^^^')
const findJobById = await Job.findById(req.params.job_id)

const selectUser = findJobById.applcates.filter(user => user === req.params.user_id)

if(req.query.status === 'success'){
    console.log('helloe')

 const successfulApplicate = await Job.findOneAndUpdate({ _id: req.params.job_id },{"$set":{"sucessfulApplicants":selectUser}},{new: true})
 res.send(successfulApplicate)

}

if(req.query.status === 'unsuccessful'){
    const unsuccessfulApplicate = await Job.findOneAndUpdate({ _id: req.params.job_id },{"$set":{"unsucessfulApplicants":selectUser}},{new: true})
 res.send(unsuccessfulApplicate)
}

//  console.log(successfulApplicate,'£££££££££')
        } catch(error){
            next(error)
        }
    }

   


module.exports = {getAllCompanies,addCompany,addJobToCompany,getAllCompanyJobs,acceptCV}