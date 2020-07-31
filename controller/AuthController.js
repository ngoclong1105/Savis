const User = require('../models/User');
const Userlogin = require('../models/Userlogin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req,res,next) =>{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err)
        {
            res.json({
                error: err
            })
        }
        let userlogin = new Userlogin ({
            username: req.body.username,
            password: hashedPass
        })
        userlogin.save()
        .then(userlogin =>{
            res.json({
                message: "User creat OK you can login now"
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })
    })

}

const login = (req,res,next) =>{
    var username = req.body.username
    var password = req.body.password

    Userlogin.findOne({username:username})
    .then(userlogin =>{
        if(userlogin){
            bcrypt.compare(password,userlogin.password,function(err,result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    User.find({},function(err,data){
                        if(err) throw err;
                        res.render("home",{users:data});
                
                    })
                }
                else{
                    res.json({
                    message:'Pw does nor matched!'
                    })
                }
                    })
                }
        else{
            res.json({
            message:'no user found'
            })
        }
    })
}

module.exports={
    register,login
}