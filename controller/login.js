const { response, request } = require('express');

const login = (req,res, next) => {
    res.render('pages/login');
}
const signup = (req,res, next) => {
    res.render('signup');
}
const logout = (req,res, next) => {
    res.render('pages/login');
}
const changepass = (req,res, next) => {
    res.render('changepass');
}

module.exports = {
    login,signup,logout,changepass
}