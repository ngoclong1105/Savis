const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan =require('morgan')
const path = require('path');

const userroute = require('./routes/user')
const login = require('./routes/login')
const AuthRoute = require('./routes/auth')
const expressLayouts = require('express-ejs-layouts');

mongoose.connect('mongodb://localhost:27017/User',{useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection
//'mongodb+srv://admin:admin@cluster0.9qxko.mongodb.net/user?retryWrites=true&w=majority'
db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log("database connection")
})
const app = express()

app.set('view engine','ejs')

app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('', login)
app.use('/api',AuthRoute)
app.use('/api/user', userroute)


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


