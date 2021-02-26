const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const port = 5000

dotenv.config()
var dir = 'uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const user = require('./routes/user');
const questions = require('./routes/questions');
const quiz = require('./routes/quiz');

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }, (err) => {
    console.log('Connected to the database!')
});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/user', user);
app.use('/questions', questions);
app.use('/quiz', quiz);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})