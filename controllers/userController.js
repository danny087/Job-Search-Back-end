const User = require("../models/user")
const Job = require("../models/jobs")
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('../config')

const addUser = async (req,res,next) => {
    try{
      const vaildEmail =   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email);
// console.log(req.body,'SSSSSSSEEeeee')
if(req.body.password.length < 10){
    
    throw{message:'your password must be more than 10 and contain at least one number',
    status: 400}
  
} else if (!vaildEmail === true) {

    throw{message:'please enter a valid email',
    status: 400}
}


    const user = await User.create({
        name:req.body.name,
        cv:req.body.cv,
        telNum:req.body.telNum,
        email:req.body.email,
        jobsApplied:req.body.jobsApplied,
        successfulApplicant:req.body.successfulApplicant,
        password: await bcrypt.hash(req.body.password,10)
    })
    res.status(201).send(user)


}  catch(error){
    next(error)
}
        
        
}

const applyForJob = (req,res,next) => {
let job = req.params.company_name
// console.log(req.params,'%%%%%%%%%')
mongoose.set('useFindAndModify', false)
Job.findById(req.params.job_id).then(job => {
//    console.log(job,'kkkkkkkkkkkkkkkkkkkkkkk')
    if(job.applcates.includes(req.params.user_id) === true){
        throw { message: "you have allready applied", status: 404 };
    }
    else{
// console.log(req.params.user_id,'jjjjjjjjjjjjjjjjjjjjj')
        Job.findOneAndUpdate({_id:req.params.job_id},{$push:
            {applcates:[req.params.user_id]}},{new: true})
            .then(applied => {
                // console.log(applied,'$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                res.send(applied)
            })
    }
})
.catch(err => next(err))

}



const logInUser = async (req,res,next) => {
    try{
    const existingEmail = await User.find({email:req.body.email})
    
   
    if(!existingEmail[0]){
                 throw new Error('No user with that email')
             }
             
             
             const vaild = await bcrypt.compare(req.body.password,existingEmail[0].password)
         if(!vaild) {
            throw new Error('No user with that password')
         }
        
      

         let token = await jwt.sign(
                         {
                            user:_.pick(existingEmail[0],['_id','email'])
                        },
                        config.SECRET.token,
                        {
                            expiresIn:'1y'
                        },
                        {alg: "HS256"}
                     )

                     

                     res.send(token)



            }

           
            catch(error){
                console.error(error);
            }

           
             
}

const makeCV = async (req,res,next) => {
                try{

                console.log(req.params,'%%%%%%%')
                console.log(req.body,'%%%%%%%')
                const addCvToUser = await  User.findByIdAndUpdate({"_id":req.params.user_id},{$set:
                    {cv:req.body.cv}},{new: true})

res.send(addCvToUser)
                
                } catch(error){
                    next(error)
                }
}

    
    
    module.exports = {addUser,applyForJob,logInUser,makeCV}