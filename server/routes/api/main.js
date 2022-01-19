const router = express.Router();

const express = require('express');
const { auth } = require('../../middleware/auth');
const { Project } = require('../../models/project');
const { User } = require("../../models/user")
const { Category } = require('../../models/category');

const router = express.Router();

//*******************han_dae Load All Project***********************
router.get('/project', async (req, res) => {
  try {
    const projectFindResult = await Project.find({creator: req.body.userId})
    res.status(200).json({success:true, projectFindResult});
  } catch (e) {
    console.log(e);
    res.json({ msg: 'No Project' });
  }
});

//create project
router.post('/write', async (req, res) => {
  try {
    const { userId, name, description} = req.body;
    // 새로운 프로젝트 생성
    Project.create({
      creator: userId,
      name,
      description
    });

    return res.status(200).json({msg:"success"})
}catch(e){
    console.log(e)
}
});




    router.delete('/project', auth, async (req, res) => {
  try {
    await Project.delete({ _id: req.params.id });
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
    return res.json({ msg: 'No Project' });
  }
});




//Create Overview
router.post("project/overview",async(req,res)=>{
    try {
        const project = await Project.findById(req.params.id);
    //New overview 생성
        const NewOverview = await overviewData.create({
        project,//???
        description,
        dueDate : moment().format('MMMM DD, YYYY'),
        }); 
        res.status(200);
        res.json({success:true, msg: "success"});
    } catch(e){
        res.status(400)
        console.log(e);
        //에러메세지
    }

//Load Overview
router.get('project/overview', async (req, res) => {
  try {
    const overviewFindResult = await overviewData.find({projectId: req.body.projectId});
    res.status(200).json({success:true, overviewData});
  } catch (e) {
    console.log(e);
    //에러메세지
  }
});


//Edit Overview

PUT - /overview
Request - projectId, description, dueDate
Response - msg: “success”





//Add Member - 아직 감 못잡는중.. 멤버를 내가 안만들고 project-schedule에서 하는거지??
router.post("project/member",auth,async(req,res)=>{
    try {
        const { userId, projectId } = req.body;
    //member 추가
        const AddMember = await Members.create({
        projectId: req.body.projectId,
        userId: req.body.userId,
        }); 
        res.AddMember;
        res.status(200);
        res.json({success:true, msg: "success"});
    } catch(e){
        res.status(400)
        console.log(e);
        //에러메세지
    }

POST - /project/member
Request - userId, projectId
Response - msg: “success”

//Delete Member

DELETE - /project/member
Request - userId, projectId
Response - msg: “success”

//Edit Due Date

PUT - /project/due
Request - projectId, dueDate
Response - msg: “success”

//Load All Tasks
router.get('project/task', async (req, res) => {
  try {
    const TaskFindResult = await tasks.find({projectId: req.body.projectId});
    res.status(200).json({success:true, tasks});
  } catch (e) {
    console.log(e);
    res.json({ msg: 'No Task' });
  }
});

//Create Task
router.post("project/task",projectId,async(req,res)=>{
    try {
        const { projectId,title, category, content, state, dueDate, isMajor} = req.body;
    //New overview 생성
        const NewTask = await tasks.create({
        projectId: req.body.projectId,
        title,
        dueDate : moment().format('MMMM DD, YYYY'),
        category,
        content,
        state,
        isMajor,
        
        });

        res.status(200);
        res.json({success:true, msg: "success"});
    } catch(e){
        res.status(400)
        console.log(e);
        //에러메세지
    }
//Edit Task

PUT - /project/task
Request - projectId, title, category, content, state, dueDate, isMajor
Response - msg: “success”

//Delete Task

DELETE - /project/task
Request - projectId
Response - msg: “success”

