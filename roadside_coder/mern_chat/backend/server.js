const express = require('express')
const dotenv = require('dotenv') // to use env file
const {chats} = require('./data/data')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')


dotenv.config();

//connect to database below .env config
connectDB()

const app = express()

app.get('/', function (req, res) {
  res.send('API running successfully')
})

// app.get('/api/chat', function (req, res) {
//     res.send(chats)
//   })

// //get single chat by id
// app.get('/api/chat/:id', function (req, res) {
//     // console.log(req.params.id)
//     const singleChat = chats.find((c)=>c._id == req.params.id)
//     res.send(singleChat)
//   })

//making endpoint for users
app.use('/api/user',userRoutes)//all further work done from userRoutes module


const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server has been started on Port ${PORT}`))