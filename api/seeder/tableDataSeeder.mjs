import { faker } from '@faker-js/faker'
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import PlaceModel from '../models/Place.js';


mongoose.connect("mongodb+srv://gichukituss:Titus1234@cluster0.saiorp4.mongodb.net/?retryWrites=true&w=majority");

async function seedPlaces() {
    try {
      const places = [];
  
      for (let i = 0; i < 20; i++) {
        const place = {
          title: faker.company.name(),
          owner: "64a505640604dd6d681035a9",
          address: faker.location.streetAddress({ useFullAddress: true }),
          category: "apartment",
          photos: [faker.image.urlPicsumPhotos(), faker.image.urlPicsumPhotos(), faker.image.urlPicsumPhotos()],
          description: faker.lorem.paragraphs(3),
          contactCode: "+254",
          contact: faker.phone.number("7########"),
          email: faker.internet.email(),
          perks: ["free parking"],
          extraInfo: faker.lorem.paragraphs(2),
          website: faker.internet.domainName(),
          youtube: "https://www.youtube.com/watch?v=iTPtpU-IpiM&pp=ygUNZW5lcyB5aWxtYXplcg%3D%3D",
          latitude: faker.location.latitude({ max: 10, min: -10 }),
          longitude: faker.location.longitude({ max: 40, min: 10 }),
          currency: "USD - $",
          price: faker.commerce.price(),
          country: "",
          county: "",
          state: "",
        };
        await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${place.latitude}&lon=${place.longitude}`)
        .then(response => response.text())
        .then(response => {
            const markedLocationDataRaw = JSON.parse(response).address;
            if(markedLocationDataRaw.country === "United States"){
                place.country = markedLocationDataRaw.country.toLowerCase();
                place.county = markedLocationDataRaw.county.split(" ")[0].toLowerCase();
                place.state = markedLocationDataRaw.state.toLowerCase();
                places.push(place);
                
            }else{
                place.country = markedLocationDataRaw.country.toLowerCase();
                place.county = markedLocationDataRaw.state.split(" ")[0].toLowerCase();
                place.state = markedLocationDataRaw.country.toLowerCase();
                console.log(faker.image.urlPicsumPhotos());
                places.push(place);
            }
        })
        .catch(err => console.log(err));
        
      }
  
      await PlaceModel.insertMany(places);
      console.log('Data seeded successfully');
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      mongoose.disconnect();
    }
  }

seedPlaces();