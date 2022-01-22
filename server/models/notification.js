const moment = require('moment');
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  date: {
    type: Date,
    ref: 'user',
    default: moment().format('MMMM DD, YYYY'),
    required: true,
  },
  isCheck: {
    type: Boolean,
    required: true,
    default: 'false',
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
  },
});

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = { Notification };
