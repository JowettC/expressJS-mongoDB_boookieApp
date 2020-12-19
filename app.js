const express = require('express');
const app = express();

// routes
app.get('/',(req,res)=>{
    res.send("1st route");
})

app.get('/posts',(req,res)=>{
    res.send("1st route");
})

const port = 3000
app.listen(port, ()=>{
    console.log("listening on "+ port);
})