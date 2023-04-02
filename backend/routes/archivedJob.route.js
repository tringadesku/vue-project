const express = require('express');
const archivedJobRoute = express.Router();


// JobPost model
let ArchivedJobModel = require('../models/ArchivedJob');

// Get all data
archivedJobRoute.route('/getArchivedJobs').get((req, res, next) => {
  ArchivedJobModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// get four latest jobposts
archivedJobRoute.route('/getLatestArchivedJobs').get((req, res, next) => {
  ArchivedJobModel.find()
      .sort({ creationDate: -1 })
      .limit(4)
      .exec((error, data) => {
          if (error) {
              return next(error);
          } else {
              res.json(data);
          }
      });
});

  
  
// Get by client id
archivedJobRoute.route('/getMyArchivedJobs').get((req, res, next) => {
    const clientId = req.query.clientId // Get the user ID from the query parameter
  
    ArchivedJobModel.find({ clientId: clientId }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
// Get by jobpostname
archivedJobRoute.route('/getThisJob').get((req, res, next) => {
  const jobPostName = req.query.jobPostName // Get the user ID from the query parameter

  ArchivedJobModel.find({ jobPostName: jobPostName }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Create Job Post
archivedJobRoute.route('/create-archivedJob').post((req, res, next) => {
  ArchivedJobModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Edit jobpost data
archivedJobRoute.route('/edit-archivedJob/:id').get((req, res, next) => {
  ArchivedJobModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update jobpost data
archivedJobRoute.route('/update-archivedJob/:id').put((req, res, next) => {
  ArchivedJobModel.findByIdAndUpdate(req.params.id, {
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

// Delete jobpost data
archivedJobRoute.route('/delete-archivedJob/:id').delete((req, res, next) => {
  ArchivedJobModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})




module.exports = archivedJobRoute;