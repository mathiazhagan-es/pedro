const {verify} =require("jsonwebtoken")


const validateToken=(req,res,next)=>{

    const accesstoken = req.header("accesstoken")

    if(!accesstoken) return res.json({error:"user not loged in!"})
    
    try{
    const validtoken=verify(accesstoken,"importantsecret")
    req.user=validtoken
if(validtoken){
    console.log("from middleware")
    return next()
}
    }catch(error){
return res.json({error:err})
    }
}

module.exports= validateToken 