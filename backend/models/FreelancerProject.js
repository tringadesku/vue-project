const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let freelancerProjectSchema = new Schema({
    freelancerId: {
        type: String
    },
    freelancerName: {
      type: String
    },
    projectName: {
        type: String
    },
    jobCategory: {
      type: String
    },
    projectDescription: {
      type: String
    },
    projectWebsite: {
      type: String
    },
    fileName: {
      type: String
    },
}, {
    collection: 'freelancerProjects'
})

module.exports = mongoose.model('FreelancerProject', freelancerProjectSchema)