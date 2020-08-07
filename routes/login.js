const express = require('express')
const router  = express.Router()

const login = require('../controller/login')

router.get('/',login.login)
router.get('/signup',login.signup)
router.get('/logout',login.logout)
router.get('/changepass',login.changepass)

module.exports= router