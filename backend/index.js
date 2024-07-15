const express=require('express')
const app=express()
const cors=require('cors')

const db=require('./models')



app.use(express.json())
app.use(cors())

const postrouter=require('./routes/post')
app.use("/post",postrouter)

const commentsrouter=require('./routes/comments')
app.use("/comments",commentsrouter)

const userrouter=require('./routes/users')
app.use('/auth',userrouter)

const likesrouter=require('./routes/likes')
app.use('/likes',likesrouter)

const port=process.env.PORT || 3001;





db.sequelize.sync()
.then(()=>{
    app.listen(port,(req,res)=>{
        console.log("server running on port 3001")
    })
})




