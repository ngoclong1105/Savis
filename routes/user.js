const express = require('express')
const router  = express.Router()

const Usercontroller = require('../controller/Usercontroller')

router.get('/',Usercontroller.getallUser)
router.post('/addUser',Usercontroller.addUser)
router.post('/deleteUser',Usercontroller.deleteUser)

module.exports= router