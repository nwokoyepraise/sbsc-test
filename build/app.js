'use-strict';

const express = require('express');

const app = express();

const server = require('http').createServer(app);

const port_number = 3000;

const cors = require('cors');

const home = require('./routes/home');

const user_reg = require('./routes/user_reg');

const user_auth = require('./routes/user_auth');

const product = require('./routes/product');

const category = require('./routes/category');

const anagram = require('./routes/anagram');

const index_algo = require('./routes/index_algo');

const states = require('./routes/states');

const factorial = require('./routes/factorial'); //use and set express middleware


app.use(express.json({
  limit: '20kb'
}));
app.use(express.urlencoded({
  extended: true
}));
app.use(cors()); //load routes

app.use('/', home);
app.use('/user_reg', user_reg);
app.use('/user_auth/login', user_auth.user_login);
app.use('/product/create', product.create);
app.use('/product/update', product.update);
app.use('/product/delete', product.delete);
app.use('/products/view', product.view);
app.use('/product/create_random', product.create_random);
app.use('/products/export_csv', product.export_csv);
app.use('/category/create', category.create);
app.use('/category/update', category.update);
app.use('/category/delete', category.delete);
app.use('/categories/view', category.view);
app.use('/category/create_random', category.create_random);
app.use('/anagram', anagram);
app.use('/index_algo', index_algo);
app.use('/states', states);
app.use('/factorial', factorial);
server.listen(port_number, () => {
  console.log(`server listening on port ${port_number}`);
});
//# sourceMappingURL=app.js.map