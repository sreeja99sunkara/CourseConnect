const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// CREATE ASSIGNMENT (ADMIN)
exports.createAssignment = async (req, res) => {
  try {
    const { title, desc, duedate, link } = req.body;

    const newAssignment = await pool.query(
      'INSERT INTO public.assignment (id, title, "desc", duedate, link) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [uuidv4(), title, desc, duedate, link]
    );

    res.json(newAssignment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.assignment");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { groupId, assignmentId } = req.body;

    await pool.query(
      'INSERT INTO public.submissions (id, group_id, assig_id, status, confirmed_at, confirmed_by) VALUES ($1,$2,$3,$4,NOW(),$5)',
      [uuidv4(), groupId, assignmentId, "submitted", req.user.id]
    );

    res.json({ message: "Submission confirmed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.getSubmissions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.submissions"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};