const express = require('express');
const jobPostRoute = express.Router();

// Student model
let JobPostModel = require('../models/JobPost');

// Get all data
jobPostRoute.route('/getJobs').get((req, res, next) => {
  JobPostModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create student data
jobPostRoute.route('/create-jobPost').post((req, res, next) => {
  JobPostModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Edit student data
jobPostRoute.route('/edit-jobPost/:id').get((req, res, next) => {
  JobPostModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update student data
jobPostRoute.route('/update-jobPost/:id').put((req, res, next) => {
    JobPostModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Student successfully updated.')
        }
    })
})

// Delete student data
jobPostRoute.route('/delete-jobPost/:id').delete((req, res, next) => {
    JobPostModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = jobPostRoute;