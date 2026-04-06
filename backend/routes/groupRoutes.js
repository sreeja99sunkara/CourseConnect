const express = require("express");
const router = express.Router();
const { createGroup, addMember, getGroups } = require("../controllers/groupController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, createGroup);
router.post("/add-member", verifyToken, addMember);
router.get("/all", verifyToken, getGroups);

module.exports = router;

