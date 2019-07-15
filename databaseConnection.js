// const mongoose = require('mongoose')
// const app = require('./app')

// let DBconnect = async () => {

//     try{

//         if (process.env.NODE_ENV === 'test') {
//             console.log('dddp')
//       const Mockgoose = require('mockgoose').Mockgoose;
//       const mockgoose = new Mockgoose(mongoose)

//       const preapreMockDatabase = await mockgoose.prepareStorage()
//       const connetToTestDb =   mongoose.connect
// ("mongodb://jobsearch:jobsearch087@ds147681.mlab.com:47681/jobsearch",{ useNewUrlParser: true })

// const connection =  mongoose.connection.once('open', () => {
//     console.log('connected to the test database')

// })
//         }   else {
//             console.log('hihihi')

//  const connetToDb =   mongoose.connect
// ("mongodb://jobsearch:jobsearch087@ds147681.mlab.com:47681/jobsearch",{ useNewUrlParser: true })

// const connection =  mongoose.connection.once('open', () => {
//     console.log('connected to the database')

// })

//         }

//     } catch(error){
//         console.log(error)
//     }
 
    
// }

// DBconnect()

// const DBdisconnect = () => {
//     return mongoose.disconnect();
// }


// module.exports = {DBconnect,DBdisconnect};