const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: '미분류',
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
    },
  ],
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Category = mongoose.model('category', CategorySchema);

module.exports = { Category };
