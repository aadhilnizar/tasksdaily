module.exports.a="test";
module.exports.b="test123";
module.exports.checkPass=function(username,password){
    if(username=="test" && password=="test123"){
        console.log("Valid")
    }else if (username=="test" && password!="test123"){
        console.log("Password Is Invalid")
    }else if (username!="test" && password=="test123"){
        console.log("Username Is Invalid")
    }else{
        console.log("error")
    }
    
}