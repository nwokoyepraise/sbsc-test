'use-strict'
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = 3000;
const cors = require('cors');
const home = require('./routes/home');
const user_reg = require('./routes/user_reg');
const user_auth = require('./routes/user_auth');
const product = require('./routes/product');

//use and set express middleware
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({extended: true}));

app.use(cors());

//load routes
app.use('/', home);
app.use('/user_reg', user_reg);
app.use('/user_auth/login', user_auth.user_login);
app.use('/product/create', product.create);
app.use('/product/update', product.update);
app.use('/product/delete', product.delete);
app.use('/products/view', product.view);


server.listen(port_number, ()=>{
    console.log(`server listening on port ${port_number}`)
})