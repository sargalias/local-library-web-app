var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const async = require('async');
const mongoose = require('mongoose');
const mongodb = require('./config/database').url;
const methodOverride = require('method-override');


// Mongoose setup
mongoose.connect(mongodb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
}));
app.use(express.static(path.join(__dirname, 'public')));




// ROUTES
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const catalogIndexRouter = require('./routes/catalogIndex');
const bookRouter = require('./routes/books');
const authorRouter = require('./routes/authors');
const bookinstanceRouter = require('./routes/bookinstances');
const genreRouter = require('./routes/genres');

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/catalog', catalogIndexRouter);
app.use('/catalog/books', bookRouter);
app.use('/catalog/authors', authorRouter);
app.use('/catalog/bookinstances', bookinstanceRouter);
app.use('/catalog/genres', genreRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
