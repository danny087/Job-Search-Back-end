
const apiRouter = require('express').Router();
const {jobsRouter} = require('./jobsRouter')
const {companiesRouter} = require('./companiesRouter')
const {userRouter} = require('./userRouter')


//get a list of all jobs
apiRouter.use("/users", userRouter)
apiRouter.use("/jobs", jobsRouter);
apiRouter.use("/companies", companiesRouter);

module.exports = {apiRouter};