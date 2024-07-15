const express=require('express')
const router=express.Router();
const{ Users }=require('../models')
const bcrypt =require ('bcrypt')
const {sign}=require ("jsonwebtoken")
const  validateToken  = require ("../middlewares/AuthMiddleware")


router.post('/',async(req,res)=>{

const { username,password }=req.body
bcrypt.hash(password,10)
.then((hash)=>{Users.create({username:username,password:hash})})
res.json("success")

})

router.post('/login',async(req,res)=>{
    const { username,password }=req.body
    const user=await Users.findOne({where:{username:username}})
    if(!user){
        res.json({error:"User dons't exist"})
    }else{
        bcrypt.compare(password,user.password)
        .then((match)=>{
            if(!match){
                res.json({error:"wrong username and pass word combination"})

            }else{
                const accesstoken=sign({username:user.username,id:user.id},"importantsecret")
                res.json({token:accesstoken,userdata:{username:username,id:user.id}})
            }
        })
    }
})

router.get('/',validateToken,async(req,res)=>{
    const user=req.user
    res.json(user)
    
    })

router.get('/basicinfo/:id',async(req,res)=>{
    const {id} =req.params
    const data=await Users.findByPk(id,{attributes:{exclude:["password"]}})
    res.json(data)
})

module.exports=router;