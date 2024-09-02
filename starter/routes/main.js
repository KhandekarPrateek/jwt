const express=require('express')
const router=express.Router()
const authMiddleware=require('../middleware/auth')


const {login,dashboard}=require('../controllers/main')
//put the middleware before the dashboard to protect that rute
router.route('/dashboard').get(authMiddleware,dashboard)

router.route('/login').post(login)

module.exports=router