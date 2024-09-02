const jwt=require('jsonwebtoken')
require('dotenv').config()
const CustomAPIError=require('../errors/custom-error')
const login=async(req,res)=>{
    const {username,password}=req.body
    console.log(username,password);
    //how to check for empty strings
    //use mongos validation
    //Joi package
    //check here itself
    if(!username || !password){
        throw new CustomAPIError('please provide email and pswd',400)
    }
//we give a id from DB here no DB so add our own
const id=new Date().getDate()
//try to keep payload small,here we give 3 params first is payload
//keep jwt secret very long and un guessable
const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:'user created',token})
}
const dashboard=async(req,res)=>{
    console.log(req.user)
    const num=Math.floor(Math.random()*100)
    res.status(200).json({
        msg:`here is your number ${req.user.username}`,
        secret:num
    })
     
}
module.exports={
    login,dashboard
}