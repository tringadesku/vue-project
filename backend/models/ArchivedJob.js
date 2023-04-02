const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let archivedJobSchema = new Schema({
    previousId: {
      type: String
    },
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
    clientId: {
      type: String
    },
    clientName: {
      type: String
    },
    archivedDate: {
      type: Date
    }
}, {
    collection: 'archivedJobs'
})

module.exports = mongoose.model('ArchivedJob', archivedJobSchema)