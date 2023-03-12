const express = require('express');
const activityRoute = express.Router();

// Activity model
let ActivityModel = require('../models/Activity');

// Get all activities
activityRoute.route('/getActivities').get((req, res, next) => {
  ActivityModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create activity 
activityRoute.route('/create-activity').post((req, res, next) => {
  ActivityModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})


// Delete activity data
activityRoute.route('/delete-activity/:id').delete((req, res, next) => {
  ActivityModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = activityRoute;