const express=require('express')
const router=express.Router();
const{Likes}=require('../models')
const validateToken=require('../middlewares/AuthMiddleware');


router.post('/',validateToken,async(req,res)=>{
console.log("on like route")
const {PostId}=req.body
const UserId=req.user.id
const found=await Likes.findOne({where:{PostId:PostId,UserId:UserId}})
if(!found){
await Likes.create({PostId:PostId,UserId:UserId})
console.log("liked")
res.json("liked")

}else{
await Likes.destroy({where:{PostId:PostId,UserId:UserId}})
console.log("unliked")
res.json("unliked")

}
})


module.exports=router