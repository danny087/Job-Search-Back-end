# Job-Search-Back-end

# About

This API is built on express.js and uses mongoDB as the database.

I have used async await with this API because i used promises in my last one. I found that I much prefare async await and will be using this way to deal with async code in the future.

All the endpoint and error codes have been tested with mocha and ive used supertest to make api calls from the test environment. When in the test environment a test database is being used. All the data is dropped in the beforeeach block and also dropped in the after block so tests stay consistent.

Both databases use MLABS a platform which allows you to use mongoDB on the cloud.

I will take you through every endpoint and show you exactly what each one does.

We will start with the user Route.

#USER

##POST:  /users

This endpoint adds a new user

Here is a user object example when created:

{ jobsApplied: [],
  successfulApplicant: [],
  _id: '5d2dce8dc4e0b82fdd23d8e7',
  name: 'jack',
  cv: 'i have great experience with node.js ans love building web scrapers',
  telNum: 43856354,
  email: 'jac@gmail.com',
  password: '$2a$10$TswNgHLoajgUaYrozqM2LuGRyzvv6/ahyDo4xicCuv7qD7BRJ0tdG',
  __v: 0 }
  
  
  I use the Bcrypt on the password for security.
  
  If you enter a password too short (less than 10 characters) you will be given a 400 error telling you that your password needs to be more than 10 characters long.
  
  You will also receive a 400 if you use an invaild email.
  
  
  ##POST: /users/login
  
  
  THis endpoint logs a user in.
  
  When making this request, first it will check to see if the email and password exist.
  
  If not you will be thrown an error telling you either the email doesn't exist or the password.
  
  I compare the passwords with Bcrypt which encrypts both the given password and the password assigned to the email.
  
  If you login successful you will be granted a JWT which gets sent back on the header. And can then make requests to the API successfully.
  
  
  
  ##POST: /users/:job_id/:user_id
  
  The can apply for jobs with this request.
  
  If you have already applied for a certain job you will get an error telling you so.
  
  Your userId will get pushed into an array held on the job object which you applied for.
  
  
  
  ##PUT: /users:user_id/cv
  
  You can make your CV with this request. The CV starts off as an empty string when your user object is created, you can create your cv so the company you applied for can see the job you applied for and then see if your cv matches the requirements for the job.
  
  
  
  
  
  
  #COMPANIES
  
  
  ##GET: /companies
  
  This endpoint will get you all of the companies
  
  
  ##GET: /companies/:comany_name/jobs
  
  
  This endpoint will get you all the jobs that belong to a certain company.
  
  
  
  ##POST: /companies
  
  This endpoint allows you to make a new company 
  
  The object of the company looks like this:
  
  { _id: '5d2dd72176641132628fb11b',
  name: 'northcoders',
  location: 'manchester',
  __v: 0 }
  
  
  
  ##POST: /companies/:company_name/jobs
  
  
  This endpoint allows the companies too create a job.
  
  With this endpoint I used geocoder to get the location of the company and used reverse geocoding to create my geometry key on the object that is created here is an example of what that looks like.
  
  
  { job:
   { applicants: [],
     successful Applicants: [],
     unsuccessful Applicants: [],
     _id: '5d2dd95cb54f7f3367403193',
     jobTitle: 'test job title',
     companyId: '5d2dd95bb54f7f3367403186',
     location: 'manchester',
     live: false,
     jobDescription: 'test job description',
     geometry:
      { type: 'point',
        _id: '5d2dd95cb54f7f3367403194',
        coordinates: [Array] },
     created_at: '2019-07-16T14:04:12.890Z',
     __v: 0 } }
     
     
     The coordinates array holds the values longitude and latitude and since the job that was created is in Manchester it will be the coordinates of Manchester.
     
     
     
     
 ##PUT: /companies/:job_id/:user_id
 
 
 With this endpoint the company can put unsuccessful applicants into one array and successful applicants into another array.
 
 If the query equals unsuccessful it will get pushed into the unsuccessful array and vice versa when the query equals successful.
 
 The job object will then contain all the applicants in their chosen array and the company can then decide what action to take next.
 
 
 
 
 
 
#JOBS


##GET: /jobs

This endpoint gets all the jobs.


##GET: /jobs/:jobLocation/location

This endpoint will get you all the jobs by the desired location. If you type in Manchester all the jobs in Manchester will be queried.

Again this uses geocoder. At the moment i have hard coded the distance with 10000 meters but this will be changed so the user can selected from 5miles,10miles, or 25miles from the chosen location.


You will receive an error if you choose a location that does not have any jobs.




##GET: /jobs/:jobs_id

This endpoint will get you the amount of applicants that have applied for this job.


##PUT: /jobs/:jobs_id

This endpoint allows you to change the status of the job to true to false.

If true the job will be live and users will be able to apply to the job and if false the job will have been taken of the jobs board and users can no longer apply for the job.



##DELETE: /jobs/:job_id

This endpoint allows you to delete a job.



     

     
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  



