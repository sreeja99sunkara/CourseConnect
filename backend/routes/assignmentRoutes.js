const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAssignments,
  getSubmissions
} = require("../controllers/assignmentController");

const { verifyToken } = require("../middleware/authMiddleware");

//Professor
router.post("/create", verifyToken, createAssignment);

// Student + Professor
router.get("/", verifyToken, getAssignments);

// Professor analytics
router.get("/:id/submissions", verifyToken, getSubmissions);

module.exports = router;