import express from "express";
const router = express.Router();

import Issue from "../../models/Issue.js";
import Project from "../../models/Project.js";
import User from "../../models/User.js";

// GET ALL ISSUES 2
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find()
    .populate("project")
    .populate("assignedUser")
    .populate("reportedUser")
    .exec();
    return res.status(200).json(issues);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Get Issue by ID
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findOne({_id: req.params.id})
    .populate("project")
    .populate("assignedUser")
    .populate("reportedUser")
    .exec();
    debugger

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
debugger
router.put("/:id", async (req, res) => {
  debugger
  const { title, description, status, priority, project, assignedUser} = req.body;
  debugger;
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, project, assignedUser },
      { new: true }
    );

    if (!updatedIssue) {
      // Handle the case where no document was found with the given ID
      debugger
      return res.status(404).json({ error: "Issue not found" });
    }

    debugger
    return res.status(200).json({ ...updatedIssue._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});


export default router;
