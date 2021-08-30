const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console.log('connection error: ')));
db.once('open', () => {
    console.log('Database connected');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})