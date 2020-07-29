const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan =require('morgan')
const userroute = require('./routes/user')

mongoose.connect('mongodb+srv://admin:admin@cluster0.9qxko.mongodb.net/user?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log("database connection")
})
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/user', userroute)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


