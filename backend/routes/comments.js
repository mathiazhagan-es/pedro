const express=require('express')
const router=express.Router();
const {Comments} =require('../models')
const  validateToken =require("../middlewares/AuthMiddleware")


router.get('/:PostId',async(req,res)=>{
    const PostId=req.params.PostId
    const comments=await Comments.findAll({where:{PostId:PostId}})
    res.json(comments)

})

router.post('/', validateToken ,async(req,res)=>{
    const comment=req.body
    const username=req.user.username
    comment.username=username
    await Comments.create(comment)
    res.json(comment)
    console.log("from comment posting")
})
router.delete('/:commentid',validateToken,async(req,res)=>{
    const {commentid}=req.params
    await Comments.destroy({where:{id:commentid}})
    res.json("deleted comment")

})




module.exports=router; 