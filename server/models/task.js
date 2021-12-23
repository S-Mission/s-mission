const moment = require('moment');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: project,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['Before', 'Ing', 'Done'],
    default: 'Before',
  },
  start_date: {
    type: String,
    required: true,
    default: moment().format('MMMM DD, YYYY'),
  },
  due_date: {
    type: String,
    required: true,
    default: moment().format('MMMM DD, YYYY'),
  },
});

const Task = mongoose.model('task', TaskSchema);

module.exports = { Task };
