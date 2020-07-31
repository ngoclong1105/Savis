const express = require('express')
const router  = express.Router()

const Usercontroller = require('../controller/Usercontroller')

router.get('/getallUser',Usercontroller.getallUser)
router.post('/addUser',Usercontroller.addUser)
router.post('/deleteUser',Usercontroller.deleteUser)
router.post('/updateUser',Usercontroller.updateUser)

module.exports= router