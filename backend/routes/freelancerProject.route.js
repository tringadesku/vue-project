const express = require('express');
const freelancerProjectRoute = express.Router();


// JobPost model
let FreelancerProjectModel = require('../models/FreelancerProject');

// Get all data
freelancerProjectRoute.route('/getJobs').get((req, res, next) => {
  FreelancerProjectModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

  
  
// Get by client id
jobPostRoute.route('/getMyProjects').get((req, res, next) => {
    const freelancerId = req.query.freelancerId // Get the user ID from the query parameter
  
    FreelancerProjectModel.find({ freelancerId: freelancerId }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

// Create Job Post
freelancerProjectRoute.route('/create-freelancerProject').post((req, res, next) => {
  FreelancerProjectModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Edit jobpost data
freelancerProjectRoute.route('/edit-freelancerProject/:id').get((req, res, next) => {
  JobPostModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update jobpost data
jobPostRoute.route('/update-freelancerProject/:id').put((req, res, next) => {
    FreelancerProjectModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Project successfully updated.')
        }
    })
})

// Delete jobpost data
freelancerProjectRoute.route('/delete-freelancerProject/:id').delete((req, res, next) => {
    FreelancerProjectModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


module.exports = freelancerProjectRoute;