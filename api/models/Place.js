const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type :mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    category: String,
    photos:[String],
    description: String,
    contactCode: String,
    contact: Number,
    email: String,
    perks:[String],
    extraInfo: String,
    website:String,
    youtube:String,
    latitude: Number,
    longitude: Number,
    currency: String,
    price: Number
});

const PlaceModel = mongoose.model('Place', placeSchema);
module.exports = PlaceModel;