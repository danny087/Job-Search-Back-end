process.env.NODE_ENV = 'test'
const mongoose = require('mongoose');
const expect = require('chai').expect
const config = require('../config')
const {app,DBconnect,DBdisconnect} = require('../app')
const request = require('supertest')(app)
var NodeGeocoder = require('node-geocoder');




describe('POST /user', () => {
    let makeTestCompany,makeTestJob,makeTestUser;
    beforeEach( async function() {
        console.log(config.GOOGLE.API_KEY,'kkkkkkkkkkkkkkkkkkkkk')
        
        this.timeout(10000)
try{
        
         
   

       
    let lol = await mongoose.connection.dropDatabase() 
        
          
       let kkl = await DBconnect()
    //    .then(() => {
           console.log('dddddddd')
           const testCompany = {
            "name":'testname',
            "location":'test location'
        }
        const testCompany2 = {
            "name":'testname2',
            "location":'testlocation2'
        }
           makeTestCompany = await request
           .post('/companies')
           .send(testCompany)
           .expect(201)
          let  makeTestCompany2 = await request
           .post('/companies')
           .send(testCompany2)
           .expect(201)
        //    console.log(makeTestCompany2,'KKKKKKKKKKKKKKKKKKK')
        //    .then((company) => {
// console.log(makeTestCompany,'**********************')
            let options = {
                provider: 'google',
                httpAdapter: 'https', 
                apiKey: config.GOOGLE.API_KEY, 
                formatter: 'json'         
              };


              let geocoder = NodeGeocoder(options);
             const getGeoLocation = await geocoder.geocode(makeTestCompany.body.location)
            //   .then(geo => {
                //   console.log(makeTestCompany.body._id,'rjrjrjrjrjrjrjrjrjsssss')
                let longitude = Number(getGeoLocation[0].longitude)
                let latitude = Number(getGeoLocation[0].latitude)
                // console.log(latitude,'%%%%%%%%%%%%%%%%%%%%')
                  const testJob = {
                    "jobTitle":"test job title",
                    "companyId":makeTestCompany.body._id,
                    "location":'manchester',
                    "jobDescription":'test job description',
                    "geometry":{"type":"point","coordinates":[longitude,latitude]},
                    "live":false,
                    }

                    const testJob2 = {
                        "jobTitle":"test job title2",
                        "companyId":makeTestCompany.body._id,
                        "location":'manchester',
                        "jobDescription":'test job description',
                        "geometry":{"type":"point","coordinates":[longitude,latitude]},
                        "live":false,
                        }

const companyName = makeTestCompany.body.name
// console.log(companyName,'^^^^^^^^^^^')
// console.log(testJob,'^^^^^^^^^^^')
                    makeTestJob = await request
                    .post(`/companies/${companyName}/jobs`)
                    .send(testJob)
                    .expect(200)
                    makeTestJob = await request
                    .post(`/companies/${companyName}/jobs`)
                    .send(testJob2)
                    .expect(200)

                    // .then((jobs) => {
                        // console.log(makeTestJob,'jobsnnsjsjsjsjs')
                        
                        //  const dhdh = await done()
                        const testUser = {
                            "name":"test name",
                            "location": "manchester",
                            "cv":'test cv',
                            "telNum":"473856354",
                            "email":"test@gmail.com",
                            "password":"testtesttesttest"
                        }

                        const testUser2 = {
                            "name":"test name",
                            "location": "manchester",
                            "cv":'test cv',
                            "telNum":"473856354",
                            "email":"test2@gmail.com",
                            "password":"testtesttesttest2"
                        }
                        const testUser3 = {
                            "name":"test name 3",
                            "location": "liverpool",
                            "cv":'i code in react ',
                            "telNum":"0473856354",
                            "email":"dd@gmail.com",
                            "password":"hellohelloehllo2"
                        }


                        makeTestUser = await request
        .post('/users')
        .send(testUser)
        .expect(201)

        makeTestUser2 = await request
        .post('/users')
        .send(testUser2)
        .expect(201)

        makeTestUser3 = await request
        .post('/users')
        .send(testUser3)
        .expect(201)

      let user2Id = makeTestUser2.body._id
        let userId = makeTestUser.body._id
        let user3Id = makeTestUser3.body._id
        let jobId = makeTestJob.body.job._id     
                        // dhdh
                    
            //   })
            makeTestJob = await request
        .post(`/users/${jobId}/${userId}`)
        .expect(200)
        makeTestJob = await request
        .post(`/users/${jobId}/${user2Id}`)
        .expect(200)
            //  console.log(userApplyForJob,'$$$$$$$$')
            
            } catch(error){
                console.log(error,'**&&&&&&&&&&&&')
            }

      
             
       
    //    })

     
    //    })
    
          
        
    })

    after(async () => {
        let lol = await mongoose.connection.dropDatabase() 
        const few = await DBdisconnect()


    })

describe('/user',() => {
    it("creats new user", () =>  {
        
        const newUser = {
            name:"jack",
            location: "liverpool",
            cv:'i have great experience with node.js ans love building web scrapers',
            telNum:"43856354",
            email:"jac@gmail.com",
            password:"jackjackjackjack"
        }
        
        return request
        .post('/users')
        .send(newUser)
        .expect(201)
        .then((res) => {
            // console.log(res.body,'$$$$$$$')
           
            expect(Object.keys(res.body).length).to.eql(9)
            
        })
        
            
        
    })

    it("POST,returns a 400 becuase user needs to enter a password longer than 10 characters", async () =>{

        const newUser = {
            name:"jack",
            location: "liverpool",
            cv:'i have great experience with node.js ans love building web scrapers',
            telNum:"43856354",
            email:"jac@gmail.com",
            password:"123456789"
        }

        const user = await request
         .post('/users')
           .send(newUser)
           .expect(400)

           expect(user.status).to.eql(400)
        //    expect(user.header.status).to.eql(400)
           expect(user.body.error).to.eql("your password must be more than 10 and contain at least one number")
    })

    it('POST,returns a 400 becuase user typed in invaild email',async () => {
        const newUser = {
            name:"jack",
            location: "liverpool",
            cv:'i have great experience with node.js ans love building web scrapers',
            telNum:"43856354",
            email:"jackgmail.com",
            password:"123456789105"
        }
      
        const user = await request
         .post(`/users`)
           .send(newUser)
           .expect(400)
           expect(user.status).to.eql(400)
           expect(user.body.error).to.eql("please enter a valid email")

           
    })


    it('POST  succesfily Apply for a job',async () => {
   

        console.log(makeTestJob.body._id,'%%%%%')
     let jobId =   makeTestJob.body._id
     let userId =    makeTestUser.body._id
     let user2Id = makeTestUser2.body._id
     let user3Id = makeTestUser3.body._id
   console.log(user2Id,'DDDDDD')
   console.log(userId,'$$$$$$')
        const userApplyForJob = await request
        .post(`/users/${jobId}/${user3Id}`)
        .expect(200)
        expect(userApplyForJob.body.applcates.includes(userId)).to.eql(true)
        expect(userApplyForJob.status).to.eql(200)
    })

    it('POST recives an error message when trying to the same job twice',async () => {
   

        console.log(makeTestJob.body,'(((((((((((((((')
        let jobId =  makeTestJob.body._id
        let userId =  makeTestUser.body._id
        console.log(jobId,'(((((((((((((((')
       
           const userApplyForJob = await request
           .post(`/users/${jobId}/${userId}`)
           
          
           .expect(404)
           
           
           

           const userApplyForJob2 = await request
           .post(`/users/${jobId}/${userId}`)
           .expect(404)

           expect(userApplyForJob2.body.error).to.eql('you have allready applied')
           expect(userApplyForJob2.error.status).to.eql(404)
       })
    



})


describe('/jobs',async () => {
    it('gets all jobs back',async () => {
        const allJobs = await request
        .get("/jobs")
        expect(200)

        // console.log(allJobs.body.length,'£$$$$')
        expect(allJobs.body.length).to.eql(2)
        expect(allJobs.status).to.eql(200)
    })
})
it.only('gets all jobs back by location',async () => {
    const api_key = config.GOOGLE.API_KEY
    const jobsByLocation = await request
    .get("/jobs/manchester/location")
    expect(200)


   let longitude = jobsByLocation.body[0].geometry.coordinates[0]
   let latitude = jobsByLocation.body[0].geometry.coordinates[1]
    // expect(userApplyForJob2.body.length).to.eql(1)
    // expect(allJobs.status).to.eql(200)

    let options = {
        provider: 'google',
        httpAdapter: 'https', 
        apiKey: api_key, 
        formatter: 'json'         
      };


      let geocoder = NodeGeocoder(options);
     const getGeoLocation = await geocoder.reverse({lat:latitude, lon:longitude})


expect(getGeoLocation[0].city).to.eql('Manchester')

})


it('get number of applicates for single job',async () => {
// console.log(makeTestJob.body._id,'%%%%%%%%')
    const numberOfApplicates = await request
    
    .get(`/jobs/${makeTestJob.body._id}`)
    expect(200)
expect(numberOfApplicates.body.number).to.eql(2)

})


it('change the job status',async () => {
   const id = await makeTestJob.body._id
//    console.log(id,'LLLLLLLLLLLLLLLLLLLL')
    let job = await request
    .put(`/jobs/${id}`)
    .expect(200)
    // console.log(job.body,'!!!!!!!')
    expect(job.body.live).to.eql(true)

})






describe('/companies',async () => {

    it('get all compaines',async () => {
        const getAllCompanies = await request
        .get('/companies')
        .expect(200)
        // console.log(getAllCompanies.body,'££££££££')
        expect(getAllCompanies.body.length).to.eql(2)
    })

    it('get all company jobs',async () => {
        let compName = makeTestCompany.body.name
        const getAllCompanyJobs = await request
        .get(`/companies/${compName}/jobs`)
        expect(200)
        // console.log(getAllCompanyJobs.body,'%%RFGTFGG')
        expect(getAllCompanyJobs.body.jobs.length).to.eql(2)

    })

    it('add company',async () => {
        const northcoders = {
            "name":'northcoders',
            "location":'manchester'
        }

 const addCompany = await request
        .post(`/companies`)
        .send(northcoders)
        expect(200)

        // console.log(addCompany.body,'$$$$$$$$$$$$$$$$$')
expect(Object.keys(addCompany.body).length).to.eql(4)
expect(addCompany.body).to.have.all.keys(
    "__v",
    "_id",
    "name",
    "location"
   
  );

    })


    it('adds job to company',async () => {

        const testJob = {
            "jobTitle":"test job title",
            "companyId":makeTestCompany.body._id,
            "location":'manchester',
            "jobDescription":'test job description',
           
            "live":false,
            }
            let companyName = makeTestCompany.body.name
            // console.log(companyName,'ssss')
        const addJobToCompany = await request
        .post(`/companies/${companyName}/jobs`)
        .send(testJob)
        .expect(200)

   
        expect(addJobToCompany.body.job.companyId).to.eql(makeTestCompany.body._id)
    })
    
})





})