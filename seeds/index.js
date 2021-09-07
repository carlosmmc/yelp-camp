const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000) // there are 1000 cities in seed file
        const price = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            author: '6137e113cd2e47332f0c1113',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/random',
            description: 'yeet bois in the woods we love it when we can be with the bugs',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('db updated!!!')
});