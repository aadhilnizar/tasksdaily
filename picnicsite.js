const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
app.set('view engine','ejs');
    app.use(express.static(path.join(__dirname,'public1')));
    app.get('/about',(req,res)=>{
        res.render('about.ejs')
    })
    app.listen(3000,()=>{
        console.log("Running");
    })