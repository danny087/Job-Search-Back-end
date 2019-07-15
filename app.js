const app = require('express')()
// const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {apiRouter} = require('./routes/apiRouter')
const jwt = require('jsonwebtoken')
const config = require('./config')

// const io = require('socket.io').listen(server)






// io.on('connection',(socket) => {
//     console.log('connect to soket io')
// })

// server.listen(9090, () => {
//     console.log('ddddd')
// })

const addUser = async (req,res) => {
    const token = req.headers.authorization
    
    try{
        let splitToken = token.split(' ')
       let fullToken = splitToken[1]
       
const {user} = await jwt.verify(fullToken,config.SECRET.token)
req.user = user

    } catch(err){
        // console.log(err)
    }
    req.next();
}


app.use(addUser)



let DBconnect = async () => {

    try{

        if (process.env.NODE_ENV === 'test') {
            
     
            console.log('test mode')
          

            
     
        const connection = await  mongoose.connect
(config.mongoDatabase.test,{ useNewUrlParser: true })
// console.log(connection,'ffffff')
const lol =  mongoose.connection.once('open', () => {
    console.log('connected to the test database')

})
        }   else {
            console.log('hihihi')

 const connetToDb =  await mongoose.connect
(config.mongoDatabase.dev,{useFindAndModify: false })
// console.log(connetToDb,'bbbbbbb')
const connection =  mongoose.connection.once('open', () => {
    console.log('connected to the database')

})

        }

    } catch(error){
        console.log(error,'jjjjjjjjjjjjjjjjjjj')
    }
 
    
}

DBconnect()

const DBdisconnect = async () => {
    try{ 
    
        return mongoose.disconnect();
    
         } catch(error){
             console.log(error)
         }
    
}



app.use(bodyParser.json())


app.use("/",apiRouter)
// error handling middleware
app.use((err,req,res,next) => {
console.log(err,'OOOOOOOOOOOOOOOOO')
if(err.message === 'your password must be more than 10 and contain at least one number') {
    res.status(err.status).send({
        error:err.message
    })
}  else if(err.message === 'please enter a valid email') {
    res.status(err.status).send({
        error:err.message
    })
}
res.status(404).send({
    error:err.message
})
})

//listening to requests



module.exports = {app,DBconnect,DBdisconnect};
