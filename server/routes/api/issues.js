import express from "express";
const router = express.Router();

import Issue from "../../models/Issue.js";
import Project from "../../models/Project.js";
import User from "../../models/User.js";

// Get All Issues
// router.get("/", async (req, res) => {
//   try {
//     const issues = await Issue.find()
//       // where(user).
//       // eq(req.user._id).
//       // populate('users\
//       // ').
//       .populate("project")
//       .exec();
//     return res.status(200).json(issues);
//   } catch (err) {
//     console.log(`${err}`);
//     return res.status(500).json({ error: err.message }); // need to change status 500 (Internal Server Error) to 400 (Bad Request)
//   }
// });

// GET ALL ISSUES 2
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().populate("project").exec();
    return res.status(200).json(issues);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Get Issue by ID
router.get("/:id", async (req, res) => {
  try {

    debugger
    const issue = await Issue.findById(req.params.id);
    return res.status(200).json(issue);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Get User's Assigned Issues
router.get("/:user_id/assignedIssues", async (req, res) => {
  const { user_id } = req.params;
  try {
    const assignedIssues = await Issue.where("assignedUser").equals(user_id);
    return res.status(200).json(assignedIssues);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Get User's Reported Issues
router.get("/:user_id/reportedIssues", async (req, res) => {
  const { user_id } = req.params;
  try {
    const reportedIssues = await Issue.where("reportedUser").equals(user_id);
    return res.status(200).json(reportedIssues);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Create Issue
router.post("/", async (req, res) => {
  let { description, project, title, reportedUser, assignedUser, newProject} = req.body;
  
  try {
    let projResult;
    
    if (newProject === true) {
      const newProjectInstance = new Project({ name: project });

      projResult = await newProjectInstance.save();
      project = projResult._id;
    } else {
      projResult = await Project.findOne({ name: project });
      project = projResult._id;
    }
    
    const newIssue = new Issue({
      title,
      description,
      project,
      reportedUser,
      assignedUser,
    });

    const result = await newIssue.save();
    projResult.issues.push(result._id);
    await projResult.save();

    return res.status(201).json({ ...result._doc });
    
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});



// NEW TEST CREATE ROUTE
// Create Issue
// router.post("/create", async (req, res) => {
//   const { description, status, priority, project, title, reportedUser } =
//     req.body;

//   try {
//     const existingProject = await Project.findOne({ name: project });
//     if (existingProject) {
//       const newIssue = new Issue({
//         title,
//         description,
//         project: existingProject._id,
//         reportedUser,
//         status,
//         priority,
//       });
//       const result = await newIssue.save();

//       existingProject.issues.push(result);
//       existingProject.save();

//       return res.status(201).json({ ...result._doc });
//     } else {
//       const newProject = new Project({ name: project });

//       const newIssue = new Issue({
//         title,
//         description,
//         project: newProject._id,
//         reportedUser,
//         status,
//         priority,
//       });

//       const result = await newIssue.save();
//       newProject.issues.push(result);

//       const projectNew = await newProject.save();
//       return res.status(201).json({ ...result._doc });
//     }
//   } catch (err) {
//     console.log(`${err}`);
//     return res.status(500).json({ error: err.message });
//   }
// });

export default router;
