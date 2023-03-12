const express = require('express');
const freelancerProjectRoute = express.Router();


// JobPost model
let FreelancerProjectModel = require('../models/FreelancerProject');

// Get all data
freelancerProjectRoute.route('/getProjects').get((req, res, next) => {
  FreelancerProjectModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

  
  
// Get by client id
freelancerProjectRoute.route('/getMyProjects').get((req, res, next) => {
    const freelancerId = req.query.freelancerId // Get the user ID from the query parameter
  
    FreelancerProjectModel.find({ freelancerId: freelancerId }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

// Create Project
freelancerProjectRoute.route('/create-freelancerProject').post((req, res, next) => {
  FreelancerProjectModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Edit project data
freelancerProjectRoute.route('/edit-freelancerProject/:id').get((req, res, next) => {
    FreelancerProjectModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update project data
freelancerProjectRoute.route('/update-freelancerProject/:id').put((req, res, next) => {
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