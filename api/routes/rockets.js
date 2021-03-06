const express = require('express');
const router = express.Router(); // roudy router is an object your are adding unto!
const mongoose = require('mongoose');//  imported to be able to create a new object ID below

const Rocket = require('./../models/rocket');

//  we are only parsing the part after /products -- which means we've already filtered for that
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to for all give rocket information api/spacex',
    });
});



router.post('/', (req, res, next) => {
    const rocket = new Rocket({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        year: req.body.price,
    });// .save() is a method provided by mongoose to be use on mongoose models- it returns a promise

    rocket.save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST request to /products',
                createdProduct: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});


module.exports = router;