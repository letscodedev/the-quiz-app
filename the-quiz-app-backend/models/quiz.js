const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: String, required: true },
    quizID: { type: String, required: true },
    quizData: { type: Object, required: true },
    score: { type: Number, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Quiz', QuizSchema);