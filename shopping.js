const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mysql = require('mysql');
app.use(express.static(path.join(__dirname,'public')));
app.use('/images', express.static(path.join(__dirname, "images")));

app.set('view engine','ejs')
//db
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
//Homepage Routes

app.get('/', (req, res) => {
    const query = 'SELECT * FROM shopping'; 
    mydb.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Server error');
            
        }
        // console.log(results);
        
        res.render('shoppingHome', { shopping: results });
    });
});

app.get('/view/:product_id', (req, res) => {
    const product_id = req.params.product_id;  // Corrected: Accessing the correct value from req.params
    console.log(product_id);
    
    const query = 'SELECT * FROM shopping WHERE product_id = ?'; 
    
    mydb.query(query, [product_id], (err, results) => {  // Corrected: Correct parameter order in query() and pass values in an array
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Server error');
        }
        
        if (results.length === 0) {
            return res.status(404).send('Product Not Found');
        }
        
        // Assuming results[0] is the correct product
        res.render('productView', { shopping: results[0] });
    });
});
app.post('/view/:product_id',(req,res)=>{
    console.log('running on post');
    res.render('addtocart')
    
})
app.get('/cart',(req,res)=>{
    res.render('addtocart')
})














app.listen(3000,()=>{
    console.log("App Running in port 3000");
    
})