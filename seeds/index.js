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
            description: 'yeet bois in the woods we love it when we can be with the bugs',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dokxhbkrl/image/upload/v1631119855/YelpCamp/abfosjtwslck6cjbbiir.jpg',
                    filename: 'YelpCamp/abfosjtwslck6cjbbiir',
                },
                {
                    url: 'https://res.cloudinary.com/dokxhbkrl/image/upload/v1631119855/YelpCamp/khs5q77qivqe4aji5nlo.jpg',
                    filename: 'YelpCamp/khs5q77qivqe4aji5nlo',
                },
                {
                    url: 'https://res.cloudinary.com/dokxhbkrl/image/upload/v1631119855/YelpCamp/uani7xjvr6kpcykrl1oc.jpg',
                    filename: 'YelpCamp/uani7xjvr6kpcykrl1oc',
                },
                {
                    url: 'https://res.cloudinary.com/dokxhbkrl/image/upload/v1631119855/YelpCamp/ibgmjdtr1neemuv1yu8z.jpg',
                    filename: 'YelpCamp/ibgmjdtr1neemuv1yu8z',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('db updated!!!')
});