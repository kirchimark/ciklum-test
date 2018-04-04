const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  articleUrl:  String,
  originalText:  String,
  userText:  String,
  isApproved: {type: Boolean, default: false},
});

module.exports = mongoose.model('Suggestion' , suggestionSchema);