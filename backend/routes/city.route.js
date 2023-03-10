const express = require('express');
const cityRoute = express.Router();

// City Model
let CityModel = require('../models/City');

// Get all data
cityRoute.route('/getCities').get((req, res, next) => {
  CityModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create city data
cityRoute.route('/create-city').post((req, res, next) => {
  CityModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})
// Edit city data
cityRoute.route('/edit-city/:id').get((req, res, next) => {
  CityModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update city data
cityRoute.route('/update-city/:id').put((req, res, next) => {
  CityModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('City successfully updated.')
        }
    })
})

// Delete city data
cityRoute.route('/delete-city/:id').delete((req, res, next) => {
  CityModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = cityRoute;