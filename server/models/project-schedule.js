const moment = require('moment');
const mongoose = require('mongoose');

const ProjectScheduleSchema = new mongoose.Schema({
  GroupName: {
    type: String,
    required: true,
    default: null,
  },
  user_member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  user_master: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
  },
});

const ProjectSchedule = mongoose.model(
  'project-schedule',
  ProjectScheduleSchema,
);

module.exports = { ProjectSchedule };
