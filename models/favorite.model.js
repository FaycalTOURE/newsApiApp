const mongoose = require('mongoose');
const {Schema} = mongoose;

const favoriteSchema = new Schema({
    author: String,
    id: String,
    title: String,
});

const FavoriteModel = mongoose.model('favorite', favoriteSchema);
module.exports = FavoriteModel;
