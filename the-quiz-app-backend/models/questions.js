const mongoose = require('mongoose');

const QuestionsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionText: { type: String, required: true },
    answerOptions: { type: Array, required: true },
});

module.exports = mongoose.model('Questions', QuestionsSchema);