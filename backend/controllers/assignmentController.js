const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// CREATE ASSIGNMENT
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

// GET ASSIGNMENTS 
exports.getAssignments = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("User:", req.user);

    const result = await pool.query(`
      SELECT 
        a.id,
        a.title,
        a."desc",
        a.duedate,
        s.status,
        s.group_id,
        g.created_by AS leader_id
      FROM assignment a
      LEFT JOIN submissions s 
        ON s.assig_id = a.id AND s.student_id = $1
      LEFT JOIN "group" g 
        ON g.groupid = s.group_id
    `, [userId]);

    console.log("Assignments:", result.rows); // ✅ now correct

    const formatted = result.rows.map(a => ({
      id: a.id,
      title: a.title,
      description: a.desc,
      deadline: a.duedate,
      status: a.status || "pending",
      groupId: a.group_id,
      isLeader: a.leader_id === userId
    }));

    res.json(formatted);

  } catch (err) {
    console.error("GET ASSIGNMENTS ERROR:", err.message);
    res.status(500).send("Server error");
  }
};

// PROFESSOR ANALYTICS 
exports.getSubmissions = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT status, COUNT(*) 
      FROM submissions
      WHERE assig_id = $1
      GROUP BY status
    `, [id]);

    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};