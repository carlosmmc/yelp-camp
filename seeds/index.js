const mongoose=require('mongoose');
const cities=require('./cities')
const { places, descriptors }=require('./seedHelpers')
const Campground=require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database connected');
});

const sample=(array) => array[Math.floor(Math.random()*array.length)];

const seedDB=async () => {
    await Campground.deleteMany({});

    for (let i=0; i<500; i++) {
        const random1000=Math.floor(Math.random()*1000) // there are 1000 cities in seed file
        const price=Math.floor(Math.random()*50)+10
        const camp=new Campground({
            author: '6137e113cd2e47332f0c1113',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'yeet bois in the woods we love it when we can be with the bugs',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dokxhbkrl/image/upload/v1631301984/YelpCamp/dominik-jirovsky-re2LZOB2XvY-unsplash_kg8v0l.jpg',
                    filename: 'YelpCamp/dominik-jirovsky-re2LZOB2XvY-unsplash_kg8v0l',
                },
                {
                    url: 'https://res.cloudinary.com/dokxhbkrl/image/upload/v1631301984/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_s9vdai.jpg',
                    filename: 'YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_s9vdai',
                },
                {
                    url: 'https://res.cloudinary.com/dokxhbkrl/image/upload/v1631301984/YelpCamp/tegan-mierle-fDostElVhN8-unsplash_djlbn9.jpg',
                    filename: 'YelpCamp/tegan-mierle-fDostElVhN8-unsplash_djlbn9',
                },
                {
                    url: 'https://res.cloudinary.com/dokxhbkrl/image/upload/v1631301984/YelpCamp/pars-sahin-V7uP-XzqX18-unsplash_ciz28y.jpg',
                    filename: 'YelpCamp/pars-sahin-V7uP-XzqX18-unsplash_ciz28y',
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