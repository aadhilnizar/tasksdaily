const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const SECRET_KEY = 'your_secret_key';
const users = [];

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
//routes
app.get('/',(req,res)=>{
    res.render('loginjwt')
})

app.post('/',(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);

    const user = users.find(u=> u.email===email);
    if(!user){
        return res.send('user not found')
    }
    
    const isPasswordvalid = bcrypt.compareSync(password,user.password);
    if(!isPasswordvalid) {
        return res.send('invalid credentials')
    }
//token Generation
    const token = jwt.sign({id:user.id,email:user.email},SECRET_KEY,{expiresIn : '1m'});
    console.log("signed Token",token);
    res.cookie('authToken',token,{httpOnly:true,secure:false});
    res.redirect('/dashboard')
})

app.get('/dashboard',(req,res)=>{
    const token = req.cookies?.authToken;

    if(!token){
        res.redirect('/');
    }
    try{
        const decoded = jwt.verify(token,SECRET_KEY);
        console.log('verift token',decoded);
        res.render('dashboardjwt',{user:decoded})
        

    } catch(err) {
        console.log(err);
        res.redirect('/')
        
    }
})

app.get('/register',(req,res)=>{
    res.render('registerjwt')
})
app.post('/register',(req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body);
    
    if(users.find(u=>u.email===email)) {
        return res.send('User Already Exists');
    }
    //hashing
    const hashedPassword = bcrypt.hashSync(password,10);
    users.push({id:users.length + 1,email,password:hashedPassword});
    console.log(users);
    return res.send('Registered Successfully')
    
})

app.get('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log('Running on 3000');
    
})