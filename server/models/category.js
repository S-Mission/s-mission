const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: '미분류',
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Category = mongoose.model('category', CategorySchema);
