const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Questions = require('../models/questions');

router.get('/', (req, res, next) => {
    Questions.find()
    .exec()
    .then( questionList => {
        return res.status(200).json({
            questions: questionList
        })
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.post('/add', (req, res, next) => {
    const questionText = req.body.question
    const answerOptions = req.body.options
    const newQuestion = new Questions ({
        _id: new mongoose.Types.ObjectId(),
        questionText: questionText,
        answerOptions: answerOptions
    })
    newQuestion.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Question Added!"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;