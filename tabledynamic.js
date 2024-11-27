const express= require('express');
const app = express();
const ejs = require('ejs');
const bodyParser=require('body-parser');
// const { forIn, replace } = require('lodash');
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
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
    app.get('/login',(req,res)=>{
        res.render('login');
        
    });
    // table data routing
    app.get('/tabledatas',(req,res)=>{
        res.render('tabledatas',{arr:arr});
    });
    
// on submit 
    app.post('/login',(req,res)=>{
        const {email,name,age}=req.body;
        console.log(email,name,age)
        arr.push({name:name,age:parseInt(age),email:email})
        // res.render('tabledatas',{arr})
        res.redirect('login')
    })  
   app.get('/delete/:email',(req,res)=>{
    const email=req.params.email;
    console.log(email);
    const index=arr.findIndex(arr=>arr.email === email);
   
        if (index !== -1){
            arr.splice(index,1);
            res.redirect('/tabledatas');
        }else{res.status(404).send({error:'User not found'})   
    }
    });
    app.get('/edit/:email',(req,res)=>{
        const email=req.params.email;
        // console.log(email);
        const index=arr.find(arr=>arr.email === email);
        console.log(email);
        res.render('edit.ejs',{index})
       });


       app.post('/edit/',(req,res)=>{
        const {email,name,age}=req.body;
        const index=arr.findIndex(arr=>arr.email === email);
        arr[index]={email,name,age};
        console.log(arr[index]);
        res.redirect('tabledatas')
        
       })
    app.listen(3000,()=>{
        console.log("App running")
    })