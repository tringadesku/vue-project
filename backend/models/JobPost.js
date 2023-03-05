const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let jobPostSchema = new Schema({
    jobPostName: {
        type: String
    },
    jobPostBudget: {
        type: Number
    },
    jobPostDescription: {
      type: String
    },
    jobApplicationDeadline: {
      type: Date
    },
    jobCategory: {
      type: String
    },
    jobClient: {
      type: String
    }
}, {
    collection: 'jobPosts'
})

module.exports = mongoose.model('JobPost', jobPostSchema)