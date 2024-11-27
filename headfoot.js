const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const router=express.Router();
app.set('view engine','ejs');
    app.use(express.static(path.join(__dirname,'public')));
    app.use('/',router)
    router.get('/headfoot',(req,res)=>{
        res.render('include.ejs')
    })
    app.listen(3000,()=>{
        console.log("Running");
    })