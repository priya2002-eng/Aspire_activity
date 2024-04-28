var express=require('express');

var server=express();


server.get("/signin",(request,response)=>{
    
var username=request.query['uname'];
response.send("<h1> welcome "+username+"</h1>")
})


server.get("/home",(request,response)=>{
    response.send("<h1>landing on home page</h1>")

})

server.listen(5000,()=>{
    console.log("express server is waiting for client connections")
})