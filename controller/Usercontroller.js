const User = require('../models/User'); //lấy user trong database
const { response } = require('express');

function fetchData(){
    return fetch("http://localhost:3000/api/user")
        .then(res => res.json())
  }

// get all user 
const getallUser = (req,res, next) => {
    User.find({},function(err,data){
        if(err) throw err;
        res.render("home",{users:data});

    })
    //.then(response =>{res.json({response})})
    //.catch(error => {res.json({
    //    message: 'Error'
    //})})

}
// add user 
const addUser = (req,res, next) =>{
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

const deleteUser = (req,res,next) => {
    let userId = req.body.userId
    User.findByIdAndRemove(userId)
    .then(response => {
        res.json({
            message:'delete user success'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Error delete'
        })
    })


}

module.exports = {
    addUser, getallUser,deleteUser
}