const router = express.Router();

const express = require('express');
const { auth } = require('../../middleware/auth');
const { Project } = require('../../models/project');
const { User } = require('../../models/user');
const { Category } = require('../../models/category');

const router = express.Router();

//*******************han_dae Load All Project***********************
router.get('/', async (req, res) => {
  try {
    const projectFindResult = await User.find({
      userId: req.body.userId,
    });

    res.status(200).json({ success: true, projectFindResult });
  } catch (e) {
    console.log(e);
    res.json({ msg: 'No Project' });
  }
});

//create project
router.post('/write', async (req, res) => {
  try {
    const { userId, name, description } = req.body;

    // 새로운 프로젝트 생성
    Project.create({
      user_master: userId,
      title: name,
      description,
    });

    return res.status(200).json({ msg: 'success' });
  } catch (e) {
    console.log(e);
  }
});

// DELETE Project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.delete({ _id: req.params.id });

    await Category.findOneAndUpdate(
      { projects: req.params.id },
      { $pull: { projects: req.params.id } },
      { new: true },
    );

    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        projects: req.params.id,
      },
    });

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    return res.json({ msg: 'No Project' });
  }
});

//Create Overview
router.post('/overview', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    //New overview 생성
    const NewOverview = await overviewData.create({
      project, //???
      description,
      dueDate: moment().format('MMMM DD, YYYY'),
    });
    res.status(200);
    res.json({ success: true, msg: 'success', NewOverview });
  } catch (e) {
    res.status(400);
    console.log(e);
    //에러메세지
  }
});

//Load Overview
router.get('/overview', async (req, res) => {
  try {
    const overviewFindResult = await overviewData.find({
      projectId: req.body.projectId,
    });
    res.status(200).json({ success: true, overviewFindResult });
  } catch (e) {
    console.log(e);
    //에러메세지
  }
});

//Edit Overview
router.put('/overview', (req, res) => {
  try {
    const { projectId, description, dueDate } = req.body;

    const update_project = await Project.findByIdAndUpdate(
      projectId, //:projectId
      {
        description,
        dueDate,
      },
      { new: true },
    );
    res.redirect(`/api/post/${post._id}`);
    res.status(200).json(update_project);
  } catch (e) {
    console.error(e);
  }
});

//Add Member - user_member라는 칼럼이 새로 필요한거아님??
router.post('/member', auth, async (req, res) => {
  try {
    const projects = await Project.findById(req.params.id);
    const user_member = await User.findById(req.params.id);
    const { userId, projectId } = req.body;
    //AddMember & AddProject
    const AddMember = await user_member.create({
      user_member: userId,
    });
    const AddProject = await projects.create({
      projectId: projectId,
    });
    res.status(200);
    res.json({ success: true, msg: 'success', AddMember, AddProject });
  } catch (e) {
    res.status(400);
    console.log(e);
    //에러메세지
  }
});
// findByIdAndUpdate
// 1. Project 데이터베이스에서 projectId로 프로젝트를 찾고(find)
// 2. user_member 칼럼에 userId를 추가한다.
// 3. User 데이터베이스에서 userId로 유저 찾고
// 4. 해당 user의 projects 칼럼에 projectId 추가한다.

//Delete Member
//이거 아닌듯...
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.delete({ _id: req.params.id });
    await user_member.delete({ _id: req.params.id });
    await Project.findOneAndUpdate(
      { projects: req.params.id },
      { $pull: { projects: req.params.id } },
      { new: true },
    );
    await User.findOneAndUpdate(
      req.params.id,
      { $pull: { user_member: req.params.id } },
      { new: true },
    );
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        projects: req.params.id,
      },
    });
    return res.json({ msg: 'success' });
  } catch (e) {
    console.log(e);
  }
});
// DELETE - /project/member
// Request - userId, projectId
// Response - msg: “success”

//Edit Due Date
router.put('/due', (req, res) => {
  try {
    const { projectId, dueDate } = req.body;

    const update_DueDate = await tasks.findByIdAndUpdate(
      projectId,
      {
        dueDate,
      },

      { new: true },
    );
    res.status(200).json({ msg: 'success', update_DueDate });
  } catch (e) {
    console.error(e);
  }
});

//Load All Tasks
router.get('project/task', async (req, res) => {
  try {
    const TaskFindResult = await tasks.find({ projectId: req.body.projectId });
    res.status(200).json({ success: true, TaskFindResult });
  } catch (e) {
    console.log(e);
    res.json({ msg: 'No Task' });
  }
});

//Create Task
router.post('project/task', projectId, async (req, res) => {
  try {
    const { projectId, title, category, content, state, dueDate, isMajor } =
      req.body;
    const NewTask = await tasks.create({
      projectId: projectId,
      title,
      dueDate,
      category,
      content,
      state,
      isMajor,
    });

    res.status(200);
    res.json({ success: true, msg: 'success', NewTask });
  } catch (e) {
    res.status(400);
    console.log(e);
    //에러메세지
  }
});
//Edit Task
router.put('/task', (req, res) => {
  try {
    const { TaskId, title, category, content, state, dueDate, isMajor } =
      req.body;

    const update_task = await tasks.findByIdAndUpdate(
      TaskId,
      title,
      category,
      content,
      state,
      dueDate,
      isMajor, //true?
      { new: true },
    );
    res.redirect(`/api/post/${tasks._id}`);
    res.status(200).json({ msg: 'success', update_task });
  } catch (e) {
    console.error(e);
  }
});

//Delete Task
router.delete('/task', auth, async (req, res) => {
  try {
    const { projectId } = req.body;

    const delete_task = await tasks.findByIdAndUpdate(projectId, {
      $pull: { tasks: tasks._id },
    });
    res.redirect(`/api/post/${tasks._id}`);
    res.json({ msg: 'success', delete_task });
  } catch (e) {
    console.log(e);
  }
});
