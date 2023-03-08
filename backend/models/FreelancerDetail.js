const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let freelancerDetailSchema = new Schema({
    freelancerId: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    city: {
      type: String
    },
    jobCategory: {
      type: String
    },
    education: {
      type: String
    },
    experience: {
      type: String
    },
    hourlyRate: {
      type: String
    },
    profileImg: {
      type: String
    }
}, {
    collection: 'freelancerDetails'
})

module.exports = mongoose.model('FreelancerDetail', freelancerDetailSchema)