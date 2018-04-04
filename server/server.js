const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParse = require('body-parser');

const indexRouter = require('./routes/indexRoutes');
const suggestionRouter = require('./routes/suggestionRoutes');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/doit');

app.use(cors());
app.use(bodyParse.urlencoded({
    extended: false,
}));
app.use(bodyParse.json({}));

app.use('/api', indexRouter);
app.use('/api/suggestion', suggestionRouter)



app.listen('3000' , () => console.log('server is running on port 3000'));