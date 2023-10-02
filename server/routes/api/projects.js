import express from "express";
import { Router } from "express";
// import User from '../../models/User.js';
import Project from "../../models/Project.js";
import Issue from "../../models/Issue.js";

const router = Router();

// Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("users")
      .populate("issues")
      .exec();

    return res.status(200).json(projects);
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Get Project by ID
router.get("/:id", async (req, res) => {
  try {
    // const issues = await Issue.find().populate("project").exec();
    // const projectFound = await Project.findById(req.params.id).populate("issues").exec();

    const projectFound = await Project.findById(req.params.id)
    .populate({
      path: 'issues',
      populate: [
        { path: 'assignedUser' }, // Populate the assignedUser field
        { path: 'reportedUser' }, // Populate the reportedUser field
      ],
    })
  .exec();
    return res.status(200).json(projectFound);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create New Project
router.post("/create", async (req, res) => {
  // WE NEED TO EDIT THE PROJECT MODEL FIELDS
  // const { name, description, users, admin, issues } = req.body;
  const { name } = req.body;

  try {
    // const newProject = new Project({ name, description, users, admin, issues });
    const newProject = new Project({ name });
    const result = await newProject.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, users, admin, _id, issues } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, users, admin, issues },
      { new: true }
    );

    return res.status(200).json({ ...updatedProject._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
