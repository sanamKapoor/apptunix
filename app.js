const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => res.send('hello'))

mongoose.connect('mongodb://localhost/apptunix', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connect!');
        app.listen(5000);    
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })
