const mongoose = require('mongoose');
const moment = require('moment');

const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format('MMMM DD, YYYY'),
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  /*reply: [
    {
      contents: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        default: moment().format('MMMM DD, YYYY'),
      },
      creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',*
      },
    },
  ],*/
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = { Comment };
