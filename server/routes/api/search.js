const express = require('express');
const { Project } = require('../../models/project');

const router = express.Router();

router.get('/:searchTerm/:skip', async (req, res, next) => {
  try {
    const searchResult = await Project.find({
      title: {
        $regex: req.params.searchTerm,
        $options: 'i', // 대소문자 구분 X
      },
    })
      .skip(Number(req.params.skip))
      .limit(12)
      .sort({ date: -1 });

    const result = { searchResult, searchCount };
    res.send(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
