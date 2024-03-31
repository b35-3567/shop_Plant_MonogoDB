 /*
var createError = require('http-errors');
var express = require('express');
//mới thêm
const cors = require('cors'); // Import middleware cors
const connectDB = require('./config/db');
 //const userRouter = require('./routes/userRouter'); true
const apiRouter=require('./routes/api');
const apiR=require('./routes/api_Plant')
const apiRegiter=require('./routes/Bai2');
const apiCategory=require('./routes/api_categories');
const apiProduct=require('./routes/api_products');
//const apiASM=require('./routes/api_ASM');
const api_Admin=require('./routes/api_Admin');
const api_authen=require('./routes/authRoutes');
const api_Cart=require('./routes/cartRoutes');
const api_Checkout=require('./routes/checkoutRoutes');
  // Kết nối CSDL
  connectDB();
//
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//mới thêm
const port = 3001;
// Sử dụng middleware cors
app.use(cors());
// Sử dụng middleware
app.use(express.json());

// Sử dụng router để tạo nên link này
 
//app.use('/users', userRouter);true
app.use('/api',apiRouter);
app.use('/api',apiR);
app.use('/',apiRegiter);
app.use('/',apiCategory);
app.use('/',apiProduct);
//app.use('/',apiASM);
app.use('/',api_Admin);
app.use('/',api_Cart);
app.use('/',api_authen);
app.use('/',api_Checkout);
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 */
 

 
const express = require('express');
const cors = require('cors'); // Import middleware cors
const connectDB = require('./config/db');
 //const userRouter = require('./routes/userRouter'); true
const apiRouter=require('./routes/api');
const apiR=require('./routes/api_Plant')
const apiRegiter=require('./routes/Bai2');
const apiCategory=require('./routes/api_categories');
const apiProduct=require('./routes/api_products');
//const apiASM=require('./routes/api_ASM');
const api_Admin=require('./routes/api_Admin');
const api_authen=require('./routes/authRoutes');
const api_Cart=require('./routes/cartRoutes');
const api_Checkout=require('./routes/checkoutRoutes');
  // Kết nối CSDL
  connectDB();

const app = express();
const port = 3001;
// Sử dụng middleware cors
app.use(cors());
// Sử dụng middleware
app.use(express.json());

// Sử dụng router để tạo nên link này
 
//app.use('/users', userRouter);true
app.use('/api',apiRouter);
app.use('/api',apiR);
app.use('/',apiRegiter);
app.use('/',apiCategory);
app.use('/',apiProduct);
//app.use('/',apiASM);
app.use('/',api_Admin);
app.use('/',api_Cart);
app.use('/',api_authen);
app.use('/',api_Checkout);
// Lắng nghe cổng
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
  

module.exports = app;

