// const express = require('express');
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// statically serve everything in the build folder 
app.use(express.static('../build'));

// catch all route handler
// app.use((req, res) => {
//   res.status(404).send('Page not found');
// });

// test for backend if it is running
app.get('/hello', (req, res) => {
  return res.status(200).json('hello');
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
