const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Quiz = require('../models/quiz');

router.get('/', (req, res, next) => {
    Quiz.find()
    .exec()
    .then( quizList => {
        return res.status(200).json({
            quiz: quizList
        })
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:userID', (req, res, next) => {
    Quiz.find( { userID: req.params.userID })
    .exec()
    .then(result => {
        res.status(200).json({
            quiz: result
        })
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

router.post('/quizdata', (req, res, next) => {
    const newQuizData = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userID,
        quizID: req.body.quizID,
        quizData: req.body.quizData,
        score: req.body.score,
        date: new Date()
    })
    .save()
    .then(result => {
        res.status(200).json({
            message: "New Quiz Data Added!"
        })
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;