const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let jobApplicationSchema = new Schema({
    jobId: {
        type: String
    },
    freelancerId: {
        type: String
    }
}, {
    collection: 'jobApplications'
})

module.exports = mongoose.model('JobApplication', jobApplicationSchema)