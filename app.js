const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authMid = require('./middleware/auth');
require('dotenv').config()

const routes = require('./routes');
const authRoutes = require('./routes/auth');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todo', authMid, routes);

mongoose.connect('mongodb://localhost/apptunix', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connect!');
        app.listen(process.env.PORT || 5000);    
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })
