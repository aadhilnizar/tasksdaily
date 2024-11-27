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
//create Table
// mydb.connect((err)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         mydb.query('CREATE TABLE employess(employee_id INT PRIMARY KEY AUTO_INCREMENT,emp_username VARCHAR(50),emp_email VARCHAR(50),emp_password VARCHAR(50))')
//         console.log('Database connected');
//     }
// });
app.get('/login',(req,res)=>{
    res.send("<h1>Welcome to your page</h1>");
    
})

//Serving Port
app.listen(3000,()=>{
    console.log(`Server running on port 3000 `);
    
})