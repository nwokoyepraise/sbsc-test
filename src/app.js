'use-strict'
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = 3000;

//use and set express json limit
app.use(express.json({ limit: '20kb' }));

server.listen(port_number, ()=>{
    console.log(`server listening on port ${port_number}`)
})