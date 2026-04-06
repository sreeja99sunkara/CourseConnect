const express = require("express");
const pool = require("./config/db");
require("dotenv").config();

const cors = require("cors");


const app = express();
app.use(express.json());

app.use(cors());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const groupRoutes = require("./routes/groupRoutes");
app.use("/api/group", groupRoutes);

const assignmentRoutes = require("./routes/assignmentRoutes");
app.use("/api/assignment", assignmentRoutes);



/*
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});
*/
// Test route
app.get("/test", async (req, res) => {
  try {
    console.log("Running user query...");
    const result = await pool.query('SELECT * FROM public."user"');
    //const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
  console.error("DB ERROR:", err.message);
  res.status(500).send(err.message);
  }
});



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});