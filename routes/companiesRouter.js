const express = require('express')

const companiesRouter = express.Router();

const {getAllCompanies,addCompany,addJobToCompany,getAllCompanyJobs,acceptCV} = require("../controllers/companiesController")


companiesRouter.get("/",getAllCompanies)
companiesRouter.get("/:company_name/jobs",getAllCompanyJobs)
companiesRouter.post("/",addCompany)
companiesRouter.post("/:company_name/jobs",addJobToCompany)
companiesRouter.put("/:job_id/:user_id",acceptCV)


module.exports = {companiesRouter}