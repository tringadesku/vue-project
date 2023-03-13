const express = require('express');
const jobPostRoute = express.Router();


// JobPost model
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

// get four latest jobposts
jobPostRoute.route('/getLatestJobs').get((req, res, next) => {
  JobPostModel.find()
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

// Search job post
jobPostRoute.route('/search-jobPosts/:query').get((req, res, next) => {
    const query = req.params.query;
  
    JobPostModel.find({
      $or: [
        { jobPostName: { $regex: query, $options: 'i' } },
        { jobPostDescription: { $regex: query, $options: 'i' } },
        { jobCategory: { $regex: query, $options: 'i' } },
        { clientName: { $regex: query, $options: 'i' } },
      ]
    }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });
  
  
// Get by client id
jobPostRoute.route('/getMyJobs').get((req, res, next) => {
    const clientId = req.query.clientId // Get the user ID from the query parameter
  
    JobPostModel.find({ clientId: clientId }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

// Create Job Post
jobPostRoute.route('/create-jobPost').post((req, res, next) => {
  JobPostModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Edit jobpost data
jobPostRoute.route('/edit-jobPost/:id').get((req, res, next) => {
  JobPostModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update jobpost data
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

// Delete jobpost data
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

//get suggested jobs
jobPostRoute.route('/getSuggestedJobs').get((req, res, next) => {
  const jobCategory = req.query.jobCategory // Get the user ID from the query parameter

  JobPostModel.find({ jobCategory: jobCategory }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//getlatestSuggested
jobPostRoute.route('/getLatestSuggestedJobs').get((req, res, next) => {
  const jobCategory = req.query.jobCategory // Get the user ID from the query parameter

  JobPostModel.find({ jobCategory: jobCategory })
  .sort({ creationDate: -1 })
  .limit(4).exec((error, data) => {
    if (error) {
        return next(error);
    } else {
        res.json(data);
    }
})})

module.exports = jobPostRoute;