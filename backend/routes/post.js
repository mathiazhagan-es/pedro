const express=require('express')
const router=express.Router();
const{Posts,Likes}=require('../models')
const validateToken=require('../middlewares/AuthMiddleware');




router.get('/',async(req,res)=>{
    const listofpost=await Posts.findAll({include:[Likes]})
    res.json(listofpost)

})

router.get('/:id',async(req,res)=>{
    const {id}=req.params
    const post=await Posts.findByPk(id)
    res.json(post)
})

router.get('/byuserid/:id',async(req,res)=>{
    const {id}=req.params
    const post=await Posts.findAll({where:{UserId:id},include:[Likes]})
    res.json(post)
})

router.post('/',validateToken,async(req,res)=>{
    const post=req.body
    post.username=req.user.username
    post.UserId=req.user.id
    await Posts.create(post)
    res.json(post)
})  
router.delete('/:postid',validateToken,async(req,res)=>{
const{postid}=req.params
await Posts.destroy({where:{id:postid}})
res.json("post deleted")

})




module.exports=router;