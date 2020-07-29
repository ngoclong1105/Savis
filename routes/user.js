const express = require('express')
const router  = express.Router()

const Usercontroller = require('../controller/Usercontroller')

router.get('/',Usercontroller.index)
router.post('/store',Usercontroller.store)

module.exports= router