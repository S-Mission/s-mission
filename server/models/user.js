const moment = require('moment');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  login_way: {
    type: String,
    required: true,
    default: 'email',
  },
  register_date: {
    type: Date,
    default: moment().format('MMMM DD, YYYY'),
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
    },
  ],
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
    },
  ],
  comments: [
    {
      project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
      },
    },
  ],
});

const User = mongoose.model('user', UserSchema);

module.exports = { User };
