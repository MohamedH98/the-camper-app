const express = require("express");
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("./../models/campground");

mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const rand1000 = Math.floor(Math.random() * 1000) + 1;
    const price = Math.floor(Math.random() * 20) + 20;
    const camp = new Campground({
      author: "6086ceaeef27333860ab7aa8",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/dji3ur3pk/image/upload/v1619719737/YelpCamp/rpe4ter5jp1vsqyt9nxj.jpg",
          filename: "YelpCamp/v5jvrpxtaobznzcdwdtb",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium molestiae repellendus modi harum doloremque repellat esse accusamus enim porro et dolor neque, necessitatibus ullam, cumque error eius facilis, sint laboriosam.",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[rand1000].longitude, cities[rand1000].latitude],
      },
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
