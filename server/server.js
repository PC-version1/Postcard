// import express from 'express';
// import path from 'path';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// const PORT = 3000;
// const app = express();

// // IMPORT Middlewares
// import userController from './controllers/userController.js';
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // statically serve everything in the build folder
// app.use(express.static('../build'));

// // import blog route
// import blogRouter from './routes/blogs.js'
// app.use('/blogs', blogRouter)

// // can possible switch over to routes to make it more straightforward
// // user login/sign up routes
// app.post('/signup', userController.createUser, (req, res) => {
//   console.log('--entering back out to route')
//   return res.status(200).json(res.locals.newUser);
// });

// app.post('/login', userController.userLogin, (req, res) => {
//   // upon successful sign up
//   return res.status(200).json(res.locals.data);
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const PORT = 3000;
const app = express();

// IMPORT Middlewares
import userController from './controllers/userController.js';
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// statically serve everything in the build folder
app.use(express.static('../build'));

// import blog route
import blogRouter from './routes/blogs.js';
app.use('/blogs', blogRouter);

// can possible switch over to routes to make it more straightforward
// user login/sign up routes
app.post('/signup', userController.createUser, (req, res) => {
  console.log('--entering back out to route');
  return res.status(200).json(res.locals.newUser);
});

app.post('/login', userController.userLogin, (req, res) => {
  // upon successful sign up
  return res.status(200).json(res.locals.data);
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
