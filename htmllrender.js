const express=require('express')
const app=express();
const path=require('path')
//static files " Loading public"
app.use(express.static(path.join(__dirname,'public')))
//Sending req and res to about page
app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'templates/index1.html'))
})
//Sending req and res to home page
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'templates/home1.html'))
})
//Running port
app.listen(3000,()=>{
    console.log("Port Running")
})