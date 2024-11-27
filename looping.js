const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
app.set('view engine','ejs');
    app.use(express.static(path.join(__dirname,'public1')));
    // app.set('views','pages')
    app.get('/loops',(req,res)=>{
        let names=[]
        res.render('loops.ejs',{names})
    })
    app.listen(3000,()=>{
        console.log("Running");
    });
    