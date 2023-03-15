const express = require('express');
const accRouter = require('./routes/accRoute');
const conRouter = require('./routes/conRoute');
const cors=require('cors');
const app = express();

app.use(cors('*'));

if (process.env.NODE_ENV === 'development') {
   console.log('hello from app.js');
  }

app.use(express.json()); 

   app.use('/api/v1/accs', accRouter);
   app.use('/api/v1/cons',conRouter);
   
module.exports = app;
   