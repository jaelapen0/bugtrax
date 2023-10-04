import express from "express";
const router = express.Router();

import Issue from "../../models/Issue.js";
import Project from "../../models/Project.js";
import User from "../../models/User.js";


router.get("/", async (req, res) => {
  try {
    const issues = await User.find()
    .populate("projects")
    .populate("issues")
    .exec();
    return res.status(200).json(issues);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

});

export default router;