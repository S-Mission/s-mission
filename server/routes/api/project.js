const express = require('express');
const { auth } = require('../../middleware/auth');
const { Project } = require('../../models/project');
const { Category } = require('../../models/category');
const { User } = require('../../models/user');
const { Comment } = require('../../models/comment');

var fs = require('fs');

const router = express.Router();
const moment = require('moment');
const dotenv = require('dotenv');
const multer = require('multer');

const { isNullOrUndefined } = require('util');

dotenv.config();

// previewImg, imgIncontent upload //
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
      return cb(res.status(400).end('only jpg, png, jpeg are allowed'), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single('file');
var uploadfile = multer({ dest: 'uploadedFiles/' }).single('file');

// Project All //
router.get('/', async (req, res) => {
  try {
    const projectFindResult = await Project.find().populate({
      path: 'creator',
    });
    
    const result = { projectFindResult };
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: 'No Project' });
  }
});

// Top Rate Projects
router.get('/topRate', async (req, res) => {
  try {
    const projectResult = await Project.find().sort({ views: -1 });

    res.json(projectResult);
  } catch (e) {
    console.log(e);
    res.json({ msg: 'No Project' });
  }
});

// Upload Image //
router.post('/uploadimage', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });

    return res.json({
      success: true,
      image: res.req.file.path,
      filename: res.req.file.filename,
    });
  });
});

// Upload File //
router.post('/uploadfile', async (req, res) => {
  uploadfile(req, res, (err) => {
    if (err) return res.json({ success: false, err });

    return res.json({
      success: true,
      filedest: res.req.file.path,
      filename: res.req.file.originalname,
    });
  });
});

// Project Create //
router.post('/write', auth, async (req, res) => {
  try {
    const { title, contents, category, previewImg, file, originalfileName } =
      req.body;
    // 새로운 프로젝트 생성
    const newProject = await Project.create({
      title,
      contents,
      previewImg: previewImg,
      creator: req.user.id,
      date: moment().format('MMMM DD, YYYY'),
      files: file,
      originalfileName,
    });
    const categoryFindResult = await Category.findOne({
      categoryName: category,
    });

    // 카테고리 만들면 실행
    if (isNullOrUndefined(categoryFindResult)) {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Project.findByIdAndUpdate(newProject._id, {
        $push: {
          category: newCategory._id,
        },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: {
          projects: newProject._id, //mongoDB는 _id로 저장
        },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          projects: newProject._id,
        },
      });
    } else {
      // 카테고리가 존재하면 실행
      await Category.findByIdAndUpdate(categoryFindResult._id, {
        $push: { projects: newProject._id },
      });
      await Project.findByIdAndUpdate(newProject._id, {
        $push: { category: categoryFindResult._id },
      });
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          projects: newProject._id,
        },
      });
    }

    res.redirect(`/api/project/${newProject._id}`);
  } catch (e) {
    console.log(e);
  }
});

// Get file //
router.get('/uploadedFiles/:originalFileName', async function (req, res) {
  if (err) return res.json({ success: false, err });

  var stream;
  var statusCode = 200;
  try {
    await function () {
      var filePath = path.join(
        __dirname,
        '..',
        'uploadedFiles',
        this.serverFileName,
      );
      var fileExists = fs.existsSync(filePath);
      if (fileExists) {
        stream = fs.createReadStream(filePath);
      } else {
        this.processDelete();
      }
    };
  } catch (e) {
    statusCode = e;
  }

  if (stream) {
    res.writeHead(statusCode, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + file.originalFileName,
    });
    stream.pipe(res);
  } else {
    res.statusCode = statusCode;
    res.end();
  }
});

// Project Detail //
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator')
      .populate({ path: 'category', select: 'categoryName' });

    project.save();

    res.json(project);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// Project Update //
// 수정 페이지
router.get('/:id/edit', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator')
      .populate({ path: 'category', select: 'categoryName' });

    res.json(project);
  } catch (e) {
    console.error(e);
  }
});

// 수정 action
router.post('/:id/update', async (req, res, next) => {
  const { title, contents, Image, category } = req.body;

  try {
    const categoryFindResult = await Category.findOne({
      categoryName: category,
    });
    console.log('아이디', req.params.id);
    const update_project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        contents,
        previewImg: Image,
        category: categoryFindResult._id,
        date: moment().format('MMMM DD, YYYY'),
      },
      { new: true },
    );
    res.redirect(`/api/project/${update_project._id}`);
  } catch (e) {
    console.log(e);
  }
});

// Project Delete //
router.delete('/:id/delete', auth, async (req, res) => {
  try {
    await Project.deleteMany({ _id: req.params.id });
    const edit_category = await Category.findOneAndUpdate(
      { projects: req.params.id },
      { $pull: { projects: req.params.id } },
      { new: true },
    );
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        projects: req.params.id,
      },
    });

    if (edit_category.projects.length === 0) {
      await Category.deleteMany({ _id: edit_category });
    }

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    return res.json({ error: e });
  }
});

// Find Category
router.get('/category/:categoryName', async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        categoryName: {
          $regex: req.params.categoryName,
          $options: 'i',
        },
      },
      'projects',
    ).populate({ path: 'projects' });

    res.send(result);
  } catch (e) {
    next(e);
  }
});

// Views Load //
router.get('/:id/views', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const result = project.views;

    res.json({ views: result });
  } catch (e) {
    res.json(e);
  }
});

router.post('/:id/views', async (req, res) => {
  const userID = req.body.userID;
  try {
    const project = await Project.findById(req.params.id);
    const result = project.views + 1;

    await Project.findByIdAndUpdate(req.params.id, {
      views: result,
    });

    await User.findByIdAndUpdate(userID, {
      views: project,
    });

    res.json({ success: true, views: result });
  } catch (e) {
    res.json({ fail: e });
  }
});

//
router.get('/:id/comments', async (req, res) => {
  try {
    const comment = await Project.findById(req.params.id).populate({
      path: 'comments',
    });

    const result = comment.comments;

    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

// WRITE COMMENT
router.post('/:id/comments', async (req, res) => {
  if (!req.body.token)
    return res.status(400).json({ msg: '로그인이 필요합니다.' });

  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName,
    project: req.body.id,
    date: moment().format('MMMM DD, YYYY'),
  });

  try {
    await Project.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });

    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          project_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });

    res.json(newComment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// DELETE COMMENT / DELETE
router.delete('/comment/:id', async (req, res) => {
  await Comment.deleteOne({ _id: req.params.id });
  await User.findByIdAndUpdate(req.body.userId, {
    $pull: {
      comments: { comment_id: req.params.id },
    },
  });
  await Project.findOneAndUpdate(
    { comments: req.params.id },
    {
      $pull: { comments: req.params.id },
    },
  );

  return res.json({ success: true });
});

module.exports = router;
