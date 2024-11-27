const mysql = require('mysql');

const express = require('express');

const app = express();

const ejs = require('ejs');

const bodyParser = require('body-parser');

const path = require('path');

app.set('view engine','ejs')

const alert = require('alert');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));

const mydb = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'onedb'
});

app.get('/login',(req,res)=>{
    res.render('insertdb')
});

app.get('/users',(req,res)=>{
    
    let sql='SELECT * FROM users';

    mydb.query(sql,(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('users',{users:result})
        }
        



      })

})

app.post('/login',(req,res)=>{
    let user=req.body.username;
    let pass=req.body.password;
    console.log(user,pass);

    mydb.connect((err)=>{
        if (err) {
            console.log(err);
        } else {
            console.log("db connected");
    
    let sql="INSERT INTO users(username,password) VALUES (?,?)";
    let values = [user,pass]
    mydb.query(sql,values,(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            console.log('Value inserted')
            res.redirect('/users');
        }

})
               }
                    })

                        })
app.get('/users/delete/:user_id',(req,res)=>{
    console.log(req.params.user_id)
    
    let sql =`DELETE FROM users WHERE user_id=${req.params.user_id}`;
    // alert('are you sure u want to delete')
    mydb.query(sql,(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/users')
        }

})
})

// app.get('/users/edit/:user_id',(req,res)=>{
//     res.render('editmysql');
//     const user = req.params.user_id;
//     console.log(user);
//     let sql =`SELECT * FROM users WHERE user_id=${user}`;
//     mydb.query(sql,(err,result)=>{
//         if(err){
//             console.log(err);
//         } else {
//             res.render('editmysql',{user})
//         }
//     })
// })
app.get('/users/edit/:user_id', (req, res) => {
    const userId = req.params.user_id; 
    console.log(userId);
    
    
    let sql = `SELECT * FROM users WHERE user_id =${userId}`; 
    mydb.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error retrieving user details");
        } 
        
            //
            console.log(result[0]);
            
            res.render('editmysql', { user: result[0] });
            
        
    });
});
app.post('/users/edit/:user_id',(req,res)=>{
    
    const userId =  req.params.user_id;
     const Username =  req.body.username;
     const Password = req.body.password;
    

    let sql =`UPDATE users SET username='${Username}',password='${Password}' WHERE user_id=${userId}`
    mydb.query(sql,(err,result)=>{
        if(err) {
            console.log(err);
            return res.status(500).send("Error updating user details");
        } else {
            res.redirect('/users')
        }
    })
})
// mydb.connect((err)=>{
//     if (err) {
//         console.log(err);
//     } else {
        // mydb.query('create database onedb');
        // mydb.query('CREATE TABLE users(user_id INT PRIMARY KEY AUTO_INCREMENT,username VARCHAR(50),password VARCHAR(50))')
        // console.log('Database connected');
        //insert a single value
        // let sql="INSERT INTO users(username,password) VALUES (?,?)";
        // let values=['test','test123']

        //insert multiple values
       
//         let sql="INSERT INTO users(username,password) VALUES ?";
//         let values=[
//             ['testimony','test000'],
//             ['test1','test456'],
//             ['sree','sree123']
//         ]

//         mydb.query(sql,[values],(err,result)=>{
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('Value inserted')
//             }
//         })
        
//     }
// })
app.listen(3000,()=>{
    console.log('running');
    
});