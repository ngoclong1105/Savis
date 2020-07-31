const User = require('../models/User'); //lấy user trong database
const { response, request } = require('express');

const index = (req,res, next) => {
        res.render('home');
    }

// get all user 
const getallUser = (req,res, next) => {
    User.find()
    .then(response =>{res.json({response})})
    .catch(error => {res.json({
        message: 'error'
    })})

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
            message:'error adduser'
        })
    })
}
//delete user
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
//update user
const updateUser = (req,res,next) => {
    let userId = req.body.userId
    let updateData = {
        username: req.body.username,
        password: req.body.password
    }

    User.findByIdAndUpdate(userId,{$set: updateData})
    .then(()=>{
        res.json({
            message: ' done update'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}

module.exports = {
    addUser, getallUser, deleteUser, updateUser, index
}