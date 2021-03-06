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
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
  pay_state: {
    type: String,
    required: true,
    default: 'before',
    enum: ['before', 'paid', 'cancelled'],
  },
  pay_date: {
    type: Date,
    default: moment().format('MMMM DD, YYYY'),
  },
  comments: [
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
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
