const express=require('express');
const app=express();
const ejs=require('ejs');
    app.set('view engine','ejs');
    app.get('/about',(req,res)=>{
        res.render('dynamicrender.ejs');
    })
    app.listen(3500,()=>{
        console.log("Running at 3500 port")
    })