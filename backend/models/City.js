const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let citySchema = new Schema({
    city: {
        type: String
    },
}, {
    collection: 'cities'
})

module.exports = mongoose.model('City', citySchema)