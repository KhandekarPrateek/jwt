

require('dotenv').config()
const jwt = require('jsonwebtoken');

const CustomAPIError=require('../errors/custom-error')
const authMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization
     if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError('no auth',401)//401 means auth error

     }
     const token=authHeader.split(' ')[1]
     try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
    
        
      const {id,username}=decoded
      req.user={id,username}//this sends data to the our dashboard 
      next()
     } catch (error) {
        throw new CustomAPIError('invalid token',401)//401 means auth error
        
     }
}
module.exports=authMiddleware