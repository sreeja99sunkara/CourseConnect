const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// CREATE GROUP
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const newGroup = await pool.query(
      'INSERT INTO public."group" (groupid, name, created_by) VALUES ($1,$2,$3) RETURNING *',
      [uuidv4(), name, userId]
    );

    res.json(newGroup.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//api
exports.addMember = async (req, res) => {
  try {
    const { groupId, email } = req.body;

    const user = await pool.query(
      'SELECT * FROM public."user" WHERE "email"=$1',
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user.rows[0].userid;

    await pool.query(
      'INSERT INTO public.group_memb (membid, group_id, user_id) VALUES ($1,$2,$3)',
      [uuidv4(), groupId, userId]
    );

    res.json({ message: "Member added" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.getGroups = async (req, res) => {
  try {
    const groups = await pool.query('SELECT * FROM public."group"');
    res.json(groups.rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

