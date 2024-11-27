const mysql = require('mysql');

const express = require('express');

const app = express();

const ejs = require('ejs');

const bodyParser = require('body-parser');

const path = require('path');

const multer = require('multer');

const upload = multer({dest: 'upload/'})

const fs = require('fs');

app.set('view engine','ejs')

const alert = require('alert');
const { error } = require('console');
const { values } = require('lodash');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'onedb'
});

app.get('/upload',(req,res)=>{
    console.log('running');
    res.render('upload.ejs')
    
})

app.post('/upload',upload.single('file'),(req,res)=>{
    console.log('Running inside post');
    const file = req.file

    savefileToDatabase(file,(error,fileId)=>{
        if (error) {
            console.log(error);
        } else {
            res.send(`file Uploaded on id ${fileId}`)
            // res.redirect('/files')
        }
    }) 
})

function savefileToDatabase(file, callback) {
    console.log(file);
    const fileData = fs.readFileSync(file.path); // Read file content
    const sql = 'INSERT INTO files(filename, file_data) VALUES(?, ?)';
    const values = [file.originalname, fileData];

    pool.query(sql, values, (error, result) => {
        if (error) {
            console.log(error);
            callback(error); // Return error if insertion fails
        } else {
            const fileId = result.insertId;
            callback(null, fileId);
            console.log('File inserted with ID:', fileId);
        }
    });
}

// Route to download the file by ID
app.get('/files/:id', (req, res) => {
    const fileId = req.params.id;

    getFileFromDatabase(fileId, (error, file) => {
        if (error) {
            res.status(500).send('An error occurred while retrieving the file');
        } else if (!file) {
            res.status(404).send('File not found');
        } else {
            // Set headers for downloading the file
            res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
            res.setHeader('Content-Type', 'application/octet-stream'); // Default binary content type
            res.send(file.file_data); // Send file data
        }
    });
});

// Function to get the file from the database
function getFileFromDatabase(fileId, callback) {
    console.log("Retrieving file from database...");
    const sql = 'SELECT filename, file_data FROM files WHERE id = ?';
    const values = [fileId];

    pool.query(sql, values, (error, result) => {
        if (error) {
            console.error('Database error:', error);
            callback(error);
        } else if (result.length > 0) {
            const file = result[0];
            callback(null, file);
        } else {
            callback(new Error("File not found"));
        }
    });
}


app.listen(3000,()=>{
    console.log('App Running on port 3000');
    
});
    