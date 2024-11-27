const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    console.log(req.method);
    // console.log(req.url);
    if(req.method=='GET' && req.url=='/about'){
        res.write("<h1>This is an about page</h1>")
        res.end()
    }
    if(req.method=='GET' && req.url=='/form'){
        // res.write("<input type="text">")
        res.write(`<html>
            <head><h1>Sign In</h1></head>
            <form method="POST" action='/message'>
            <div style">
                <label>Enter Username</label><input type="text" name="username"></br>
                <label>Enter Password</label><input type="password" name="password"></br>
                <input type="Submit">
                </div>
            </form>
            </html>`);
        res.end();

    }
    if(req.method=='POST' && req.url=='/message'){
        let body=[];
        res.write("<h1>Form Submitted</h1>")
        req.on('data',(chunk)=>{
            body.push(chunk);
            console.log(body);
        })
        req.on('end',()=>{
            let msg=Buffer.concat(body).toString(); 
            fs.writeFileSync("data1.txt",msg)
    });
            
        }
    
    
})

server.listen(5000,()=>{
    console.log("Listening to 5000");
    
})