const mongoose=require('mongoose');
const cities=require('./cities')
const { places, descriptors, testUsers, photos }=require('./seedHelpers')
const Campground=require('../models/campground');
require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
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
        const campPhoto=Array(3).fill().map(() => Math.round(Math.random()*(photos.length-1)))
        const camp=new Campground({
            author: testUsers[Math.floor(Math.random()*testUsers.length)],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, sit blanditiis? Alias porro nihil natus illo esse, iure libero error tenetur reprehenderit odio dolores ullam pariatur magni numquam nam amet?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
            },
            images: [
                {
                    url: photos[campPhoto[0]][0],
                    filename: photos[campPhoto[0]][1],
                },
                {
                    url: photos[campPhoto[1]][0],
                    filename: photos[campPhoto[1]][1],
                },
                {
                    url: photos[campPhoto[2]][0],
                    filename: photos[campPhoto[2]][1],
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