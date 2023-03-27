const express = require('express');
const app = express();
const PORT = 3000;
var bodyParser = require('body-parser');
const Task = require('./models/Task');
const routes = require('./route');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});
app.use(bodyParser.json());

// define routes
app.use('/', routes);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));