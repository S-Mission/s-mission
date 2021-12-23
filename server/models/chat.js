const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    type: {
      type: String,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project-schedule',
    },
    chat_msg: {
      type: String,
    },
    sender: {
      type: String,
      ref: 'user',
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model('chat', chatSchema);

module.exports = { Chat };
