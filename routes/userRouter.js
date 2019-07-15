const express = require('express')

const userRouter = express.Router();
const {addUser,applyForJob,logInUser,makeCV} = require('../controllers/userController')

userRouter.post("/",addUser)
userRouter.post("/login",logInUser)
userRouter.post("/:job_id/:user_id",applyForJob)
userRouter.put("/:user_id/cv",makeCV)
//make cv has not been tested


module.exports = {userRouter}