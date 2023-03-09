const express = require('express');
const categoryRoute = express.Router();

// Student model
let CategoryModel = require('../models/Category');

// Get all data
categoryRoute.route('/getCategories').get((req, res, next) => {
  CategoryModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Create student data
categoryRoute.route('/create-category').post((req, res, next) => {
  CategoryModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})
// Edit student data
categoryRoute.route('/edit-category/:id').get((req, res, next) => {
  CategoryModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update student data
categoryRoute.route('/update-category/:id').put((req, res, next) => {
  CategoryModel.findByIdAndUpdate(req.params.id, {
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
categoryRoute.route('/delete-category/:id').delete((req, res, next) => {
  CategoryModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = categoryRoute;