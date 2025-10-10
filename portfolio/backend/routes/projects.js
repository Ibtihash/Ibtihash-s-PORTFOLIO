const router = require('express').Router();
let Project = require('../models/project.js');

// Get all projects
router.route('/').get(async (req, res) => {
  console.log("👉 /projects hit (GET)"); // Added console log
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: err.stack || err.message || "An unknown error occurred" }); // Ensure a string is always sent
  }
});

// Add a project
router.route('/add').post(async (req, res) => {
  console.log("👉 /projects/add hit");
  console.log("req.body:", req.body);

  try {
    const { title, description, link, githubLink } = req.body;

    const newProject = new Project({
      title,
      description,
      link,
      githubLink
    });

    await newProject.save();
    res.json({ message: 'Project added!', project: newProject });
  } catch (err) {
    console.error("❌ Error adding project:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get project by ID
router.route('/:id').get(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete project
router.route('/:id').delete(async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update project
router.route('/update/:id').post(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ error: "Project not found" });

    project.title = req.body.title;
    project.description = req.body.description;
    project.link = req.body.link;
    project.githubLink = req.body.githubLink;

    await project.save();
    res.json({ message: 'Project updated!', project });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;