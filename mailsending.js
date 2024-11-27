const express = require('express');

const path = require('path');

require('dotenv').config();

const bodyParser = require('body-parser');



const app = express();

const nodemailer = require('nodemailer');

const ejs = require('ejs');

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));

app.get('/signup',(req,res)=>{
    res.render('mailsendsignup')
});

app.get('/otp',(req,res)=>{
    res.render('otppage')
})
app.post('/signup',(req,res)=>{
    console.log(req.body);
    var randomFixedInteger =100000 + Math.floor(Math.random() * 900000);;

    console.log(randomFixedInteger);
    
    // const emailSend=req.body.email
    let transporter = nodemailer.createTransport(
        {
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_PASSWORD
            }
        }
    )

    let mailOptiions = {
        from:process.env.EMAIL,
        to:req.body.email,
        subject:'EMAIL VERIFICATION',
        text:`Your OTP is ${randomFixedInteger}`,
        // attachments:[
        //     {
        //         filename: 'paris.png',
        //         path: "D:/Project/Tasks/assets/paris.png"
        //     }
        // ]
    }
    //send mail
    transporter.sendMail(mailOptiions,(error,info)=>{
        if(error) {
            return console.log(error)
        }
        console.log('Email is sent:'+info.response)
    })
    res.redirect('otppage')
})

app.post('/',(req,res)=>{
    // let transporter = nodemailer.createTransport(
    //     {
    //         host:'smtp.gmail.com',
    //         port:587,
    //         secure:false,
    //         auth:{
    //             user:process.env.EMAIL,
    //             pass:process.env.EMAIL_PASSWORD
    //         }
    //     }
    // )

    // let mailOptiions = {
    //     from:process.env.EMAIL,
    //     to:req.body.email,
    //     subject:'Sending mail using nodejs',
    //     text:'This mail is sent using node js',
    //     attachments:[
    //         {
    //             filename: 'paris.png',
    //             path: "D:/Project/Tasks/assets/paris.png"
    //         }
    //     ]
    // }
    // //send mail
    // transporter.sendMail(mailOptiions,(error,info)=>{
    //     if(error) {
    //         return console.log(error)
    //     }
    //     console.log('Email is sent:'+info.response)
    // })
});

app.listen(3000,()=>{
    console.log('Running');
    
})