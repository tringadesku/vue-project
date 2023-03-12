const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let activitySchema = new Schema({
    activityDescription: {
     type: String
    },
    activityDate: {
      type: Date
    },
    userId: {
      type: String
    }
}, {
    collection: 'activities'
})

module.exports = mongoose.model('Activity', activitySchema)