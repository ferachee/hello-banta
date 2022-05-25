import express from "express";
// import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from 'cors';
import indexRouter from './routes/index.js';


const app = express()
const port = process.env.port || 3000;
app.listen(port, () =>  console.log(`Express server running on port: ${port}`) )
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(cors());
app.options('*',cors());
const allowCrossDomain = (req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);

app.use('/api', indexRouter);

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
  res.send({"error": "error occurs"});
});

