const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParse = require('body-parser');

const indexRouter = require('./routes/indexRoutes');
const suggestionRouter = require('./routes/suggestionRoutes');
const htmlRouter = require('./routes/htmlRoutes');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/ciklum');

app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());
app.use(bodyParse.urlencoded({
    extended: false,
}));
app.use(bodyParse.json({}));

app.use('/api', indexRouter);
app.use('/api/suggestion', suggestionRouter)
app.use('*', htmlRouter);


app.listen('3000', () => console.log('server is running on port 3000'));