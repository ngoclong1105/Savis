const User = require('../models/User'); //lấy user trong database

// get all user 
const index = (req,res, next) => {
    User.find()
    .then(response => {res.json({response})})
    .catch(error => {res.json({
        message: 'Error'
    })})

}

const store = (req,res, next) =>{
    let user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save()
    .then(response=>{
        res.json({
            message: 'OK'
        })
    })
    .catch(error=>{
        res.json({
            message:'error'
        })
    })
}

module.exports = {
    index, store
}