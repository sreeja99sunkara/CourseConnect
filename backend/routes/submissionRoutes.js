const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

// SUBMIT
router.post("/submit", verifyToken, async (req, res) => {
  const { assignmentId, groupId } = req.body;

  if (!assignmentId || !groupId) {
    return res.status(400).json({ msg: "Missing data" });
  }

  try {
    await pool.query(
      `INSERT INTO submissions 
       (id, group_id, assig_id, status, student_id, submitted, submitted_at)
       VALUES ($1,$2,$3,'submitted',$4,true,NOW())`,
      [require("uuid").v4(), groupId, assignmentId, req.user.id]
    );

    res.json({ msg: "Assignment submitted" });

  } catch (err) {
    console.error("SUBMIT ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

// ACKNOWLEDGE 
router.post("/acknowledge", verifyToken, async (req, res) => {
  const { groupId } = req.body;
  const userId = req.user.id;

  try {
    const group = await pool.query(
      `SELECT leader_id FROM "group" WHERE groupid=$1`,
      [groupId]
    );

    if (group.rows.length === 0) {
      return res.status(404).json({ msg: "Group not found" });
    }

    if (group.rows[0].leader_id !== userId) {
      return res.status(403).json({ msg: "Only leader can acknowledge" });
    }

    await pool.query(
  `UPDATE submissions
   SET status='acknowledged',
       acknowledged = true,
       acknowledged_at = NOW(),
       acknowledged_by = $1
   WHERE group_id=$2`,
  [userId, groupId]
);

    res.json({ msg: "Acknowledged successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error acknowledging" });
  }
});

module.exports = router;