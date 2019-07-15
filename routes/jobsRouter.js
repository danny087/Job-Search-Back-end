const express = require('express')

const jobsRouter = express.Router();

const {getAllJobs,jobRoleStatus,getJobsByLocation,numberOfApplicants,deleteJob} = require('../controllers/jobController')

jobsRouter.get("/",getAllJobs)
jobsRouter.get("/:jobLocation/location",getJobsByLocation)
jobsRouter.get("/:job_id",numberOfApplicants)
jobsRouter.put("/:job_id",jobRoleStatus)
jobsRouter.delete("/:job_id",deleteJob)



module.exports = {jobsRouter}