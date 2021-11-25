'use-strict'
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = 3000;
const home = require('../src/routes/home');
const user_reg = require('../src/routes/user_reg');
const user_auth = require('../src/routes/user_auth');

//use and set express json limit
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({extended: true}));

//load routes
app.use('/', home);
app.use('/user_reg', user_reg);
app.use('/user_auth/login', user_auth.user_login)

server.listen(port_number, ()=>{
    console.log(`server listening on port ${port_number}`)
})