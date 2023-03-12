const express = require('express');
const lastLoginRoute = express.Router();

// Student model
let LastLoginModel = require('../models/LastLogin');

// Get all data
lastLoginRoute.route('/getLastLogins').get((req, res, next) => {
  LastLoginModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create student data
lastLoginRoute.route('/create-lastLogin').post((req, res, next) => {
  LastLoginModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

//get by user Id
lastLoginRoute.route('/getMyLastLogin').get((req, res, next) => {
  const userId = req.query.userId // Get the user ID from the query parameter

  LastLoginModel.find({ userId: userId }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


//apply for job
lastLoginRoute.post('/apply', (req, res) => {
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
lastLoginRoute.route('/edit-jobApplication/:id').get((req, res, next) => {
  JobApplicationModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update lastLogin data
lastLoginRoute.route('/update-lastLogin/:id').put((req, res, next) => {
  LastLoginModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('LastLogin successfully updated.')
        }
    })
})

// Delete lastLogin data
lastLoginRoute.route('/delete-lastLogin/:id').delete((req, res, next) => {
  LastLoginModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = lastLoginRoute;