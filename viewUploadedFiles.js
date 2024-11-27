const mysql = require('mysql');

const express = require('express');

const app = express();

const ejs = require('ejs');

const bodyParser = require('body-parser');

const path = require('path');

const multer = require('multer');

const mime = require('mime-types')

const upload = multer({dest: 'upload/'})

const fs = require('fs');
const { error } = require('console');

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'upload')));

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
    
});

app.post('/upload',upload.single('file'),(req,res)=>{
    console.log('Running inside post');
    const file = req.file
//Get the file extension
    const fileExtension = mime.extension(file.mimetype)
    console.log(fileExtension);
    
    if (!fileExtension) {
        return res.status(400).send('Invalid File Type');
    }
    //creating new file name with th extension
    const newFilename = `${file.filename}.${fileExtension}`;
    const oldFilePath = path.join(__dirname,'upload',file.filename);
    const newFilePath = path.join(__dirname,'upload',newFilename);
    //Rename the file with the extension
    fs.renameSync(oldFilePath,newFilePath);
    //save  the file with the updated filename and extension
    const fileData = fs.readFileSync(newFilePath);
    savefileToDatabase(newFilename,fileData,file.mimetype,(error,fileId)=>{
        if (error) {
            console.log(error);
        } else {
            res.send(`file Uploaded on id ${fileId}`)
            console.log(newFilename);
            
        }
    }) 
})

//display the uploaded files
app.get('/files',(req,res)=>{
    const sql = 'SELECT id,filename FROM files';
    pool.query(sql,(error,result)=>{
        if (error) {
            res.status(500).send('Database Error');
            console.log(error);
        } else [
            res.render('Uploadedfiles.ejs',{result})
        ]
    })
})
app.get('/files/:id',(req,res)=>{
    const fileId = req.params.id;
    // console.log(fileId);
    
    getFileFromDatabase(fileId,(error,file)=>{
        if (error) {
            res.status(500).send('Error occured')
            console.log(error);
            
        } else if (!file) {
            res.status(404).send('File not found')
        } else {
            res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);
            res.setHeader('Content-Type', file.mimetypes); // Default binary content type
            res.send(file.file_data); // Send file data
        }
    })
})

//routes
app.listen(3000,()=>{
    console.log('App Running on port 3000');
    
});
//functions
function getFileFromDatabase(fileId, callback) {
    console.log("Retrieving file from database..."+fileId);
    const sql ='SELECT filename,file_data,mimetypes FROM files WHERE id = ?';
    const values = [fileId];
    // console.log(values);
    
    pool.query(sql,values,(error, result) => {
        console.log(result);
        
        if (error) {
            console.error('Database error:', error);
            // callback(error);
        } else if (result.length > 0) {
            const file = result[0];
            console.log(file);
            
            callback(null, file);
            console.log(file);
            
        } else {
            callback(new Error("File not found"));
        }
    });
}



//fileUpload function
function savefileToDatabase(filename,file_data,mimetypes,callback) {
    const sql ='INSERT INTO files(filename,file_data,mimetypes) VALUES (?,?,?)';
    const values = [filename,file_data,mimetypes];
    pool.query(sql,values,(error,result)=>{
        if (error) {
            callback(error)
        } else {
            const fileId = result.insertId;
            callback(null,fileId)
        }
    })
}








    