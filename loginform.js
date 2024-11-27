const express= require('express');
const app = express();
const ejs = require('ejs');
const path = require('path')
const mysql = require('mysql');
const session = require('express-session');;
const cookieParser = require('cookie-parser')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(session({
    secret:'SecretcodeToCookies',
    resave:false,
    saveUninitialized:true
}))
app.set('view engine','ejs');
const mydb = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'onedb'
});
mydb.connect((err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("db connected");
    }
})
    app.get('/login',(req,res)=>{
        res.render('login');
    });

    app.post('/login',(req,res)=>{
        const {username,password} = req.body;
      
        const sql ='SELECT username,password FROM users WHERE username=? AND password=?';
        const values = [username,password]
        mydb.query(sql,values,(err,result)=>{
            if (err) {
                console.log(err);
            } 
            if (result.length >0) {
                req.session.usersession = username;
                res.cookie('username',username,{httpOnly:true,maxAge:10000});
        
                console.log('Values found')
                res.redirect('/dashboard');
            
            } else {
                res.send('Invalid Cred')
            }
        })
                       
           })
        
                            
        app.get('/dashboard',(req,res)=>{
           
            const username = req.cookies.username
            
            
            if (username) {
                res.render('dashboard')
            } else {
                res.redirect('/login')
            }
        });
        app.get('/logout',(req,res)=>{
            res.clearCookie('username');
            delete req.session;
            res.redirect('/login')
        })
    
    app.listen(3000,()=>{
        console.log("App running")
    })