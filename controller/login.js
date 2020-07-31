const { response, request } = require('express');

const login = (req,res, next) => {
        res.render('login');
}
const signup = (req,res, next) => {
    res.render('signup');
}

module.exports = {
    login,signup
}