const express = require('express');
const clientDetailRoute = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Student model
let ClientDetailModel = require('../models/ClientDetail');

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
clientDetailRoute.route('/getClientDetails').get((req, res, next) => {
  ClientDetailModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Search client details
clientDetailRoute.route('/search-clientDetails/:query').get((req, res, next) => {
  const query = req.params.query;

  ClientDetailModel.find({
    $or: [
      { clientId: { $regex: query, $options: 'i' } },
      { firstName: { $regex: query, $options: 'i' } },
      { lastName: { $regex: query, $options: 'i' } },
      { position: { $regex: query, $options: 'i' } },
      { companyName: { $regex: query, $options: 'i' } },
      { city: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } }
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
clientDetailRoute.route('/getMyClientDetails').get((req, res, next) => {
  const clientId = req.query.clientId // Get the user ID from the query parameter

  ClientDetailModel.find({ clientId: clientId }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Create student data
clientDetailRoute.route('/create-clientDetail').post(upload.single('profileImg'), (req, res, next) => {
  const newClientDetail = new ClientDetailModel({
    clientId: req.body.clientId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    companyName: req.body.companyName,
    city: req.body.city,
    description: req.body.description,
    profileImg: req.file.filename // save uploaded file name to database
  });

  newClientDetail.save((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Edit student data
clientDetailRoute.route('/edit-clientDetail/:id').get((req, res, next) => {
  ClientDetailModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Update student data
clientDetailRoute.route('/update-clientDetail/:id').put(upload.single('profileImg'), (req, res, next) => {
  const updateClientDetail = {
    clientId: req.body.clientId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    companyName: req.body.companyName,
    city: req.body.city,
    description: req.body.description,
    profileImg: req.file.filename
  };

  // Check if a new image was uploaded and save its filename to the database
  if (req.file) {
    updateClientDetail.profileImg = req.file.filename;
  }

  ClientDetailModel.findByIdAndUpdate(req.params.id, {
    $set: updateClientDetail
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log('Client detail successfully updated.')
    }
  })
})

// Delete student data
clientDetailRoute.route('/delete-clientDetail/:id').delete((req, res, next) => {
  ClientDetailModel.findByIdAndDelete(req.params.id, (error, data) => {
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

module.exports = clientDetailRoute;
