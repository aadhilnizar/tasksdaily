const express=require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
    app.get('/tbl',(req,res)=>{
            let arr=[
                {   name :'Aadhil',
                    age :'21',
                    email :'aad@gmail.com'},
                {   name :'Sree',
                    age :'21',
                    email :'sre@gmail.com'},
                {   name :'Ste',
                    age :'21',
                    email :'ste@gmail.com'},
                {   name :'Jen',
                    age :'21',
                    email :'jen@gmail.com'},
    

            ];
            res.render('tabledatas',{arr})
    });
    app.listen(3000,()=>{
        console.log("Running")
    })