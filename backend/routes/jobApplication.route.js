const express = require('express');
const jobApplicationRoute = express.Router();

// Student model
let JobApplicationModel = require('../models/JobApplication');

// Get all data
jobApplicationRoute.route('/getJobApplications').get((req, res, next) => {
  JobApplicationModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create student data
jobApplicationRoute.route('/create-jobApplication').post((req, res, next) => {
  JobApplicationModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

//get by freelancer Id
jobApplicationRoute.route('/getMyJobApplications').get((req, res, next) => {
  const freelancerId = req.query.freelancerId // Get the user ID from the query parameter

  JobApplicationModel.find({ freelancerId: freelancerId }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//get by job Id
jobApplicationRoute.route('/getByJobId').get((req, res, next) => {
  const jobId = req.query.jobId // Get the user ID from the query parameter

  JobApplicationModel.find({ jobId: jobId }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//get by job Id and freelancerId
jobApplicationRoute.route('/getJobApplication').get((req, res, next) => {
  const freelancerId = req.query.freelancerId
  const jobId = req.query.jobId // Get the user ID from the query parameter

  JobApplicationModel.find({ freelancerId: freelancerId, jobId: jobId }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//apply for job
jobApplicationRoute.post('/apply', (req, res) => {
  const { freelancerId, jobId } = req.body;
  const newJobApplication = new JobApplicationModel({
    freelancerId,
    jobId
  });
  newJobApplication.save((err, jobApplication) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(jobApplication);
    }
  });
});

// Edit student data
jobApplicationRoute.route('/edit-jobApplication/:id').get((req, res, next) => {
  JobApplicationModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update student data
jobApplicationRoute.route('/update-jobApplication/:id').put((req, res, next) => {
  JobApplicationModel.findByIdAndUpdate(req.params.id, {
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
jobApplicationRoute.route('/delete-jobApplication/:id').delete((req, res, next) => {
  JobApplicationModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = jobApplicationRoute;