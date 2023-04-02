const express = require('express');
const freelancerDetailRoute = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Student model
let FreelancerDetailModel = require('../models/FreelancerDetail');

// Multer configuration for storing uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all data
freelancerDetailRoute.route('/getFreelancerDetails').get((req, res, next) => {
  FreelancerDetailModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

//get only 3 freelancers
freelancerDetailRoute.route('/getFourFreelancers').get((req, res, next) => {
  FreelancerDetailModel.find().limit(3).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})


// Search freelancer details
freelancerDetailRoute.route('/search-freelancerDetails/:query').get((req, res, next) => {
  const query = req.params.query;

  FreelancerDetailModel.find({
    $or: [
      { freelancerId: { $regex: query, $options: 'i' } },
      { firstName: { $regex: query, $options: 'i' } },
      { lastName: { $regex: query, $options: 'i' } },
      { city: { $regex: query, $options: 'i' } },
      { jobCategory: { $regex: query, $options: 'i' } },
      { education: { $regex: query, $options: 'i' } },
      { experience: { $regex: query, $options: 'i' } },
      { hourlyRate: { $regex: query, $options: 'i' } }
    ]
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});



// Get by freelancer id
freelancerDetailRoute.route('/getMyFreelancerDetails').get((req, res, next) => {
  const freelancerId = req.query.freelancerId // Get the user ID from the query parameter

  FreelancerDetailModel.find({ freelancerId: freelancerId }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get by freelancer category
freelancerDetailRoute.route('/getFreelancersByCategory').get((req, res, next) => {
  const jobCategory = req.query.jobCategory // Get the user ID from the query parameter

  FreelancerDetailModel.find({ jobCategory: jobCategory }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Create student data
freelancerDetailRoute.route('/create-freelancerDetail').post(upload.single('profileImg'), (req, res, next) => {
  const newFreelancerDetail = new FreelancerDetailModel({
    freelancerId: req.body.freelancerId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    jobCategory: req.body.jobCategory,
    education: req.body.education,
    experience: req.body.experience,
    hourlyRate: req.body.hourlyRate,
    profileImg: req.file.filename // save uploaded file name to database
  });

  newFreelancerDetail.save((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Edit student data
freelancerDetailRoute.route('/edit-freelancerDetail/:id').get((req, res, next) => {
  FreelancerDetailModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Update student data
freelancerDetailRoute.route('/update-freelancerDetail/:id').put(upload.single('profileImg'), (req, res, next) => {
  const updateFreelancerDetail = {
    freelancerId: req.body.freelancerId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    jobCategory: req.body.jobCategory,
    education: req.body.education,
    experience: req.body.experience,
    hourlyRate: req.body.hourlyRate,
    profileImg: req.file.filename
  };

  // Check if a new image was uploaded and save its filename to the database
  if (req.file) {
    updateFreelancerDetail.profileImg = req.file.filename;
  }

  FreelancerDetailModel.findByIdAndUpdate(req.params.id, {
    $set: updateFreelancerDetail
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log('Freelancer detail successfully updated.')
    }
  })
})

// Delete student data
freelancerDetailRoute.route('/delete-freelancerDetail/:id').delete((req, res, next) => {
  FreelancerDetailModel.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // Delete the image file from the public/uploads folder
      const imagePath = '../public/uploads/' + data.profileImg;
      fs.unlink(imagePath, (error) => {
        if (error) {
          console.error(error);
        }
      });

      res.status(200).json({
        msg: data
      });
    }
  })
})

module.exports = freelancerDetailRoute;
