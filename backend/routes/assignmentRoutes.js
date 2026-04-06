const express = require("express");
const router = express.Router();
const { createAssignment, getAssignments, submitAssignment, getSubmissions } = require("../controllers/assignmentController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, createAssignment);
router.get("/all", verifyToken, getAssignments);
router.post("/submit", verifyToken, submitAssignment);
router.get("/submissions", verifyToken, getSubmissions);

module.exports = router;