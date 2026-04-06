import React, { useState, useEffect } from "react";
import API from "../services/api";
import '../dashboard.css';

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [duedate, setDueDate] = useState("");
  const [link, setLink] = useState("");

  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  // 🔹 CREATE ASSIGNMENT
  const createAssignment = async () => {
    try {
      await API.post("/api/assignment/create", {
        title,
        desc,
        duedate,
        link,
      });

      alert("Assignment created");

      setTitle("");
      setDesc("");
      setDueDate("");
      setLink("");

      fetchAssignments(); // refresh
    } catch (err) {
      alert(err.response?.data?.message || "Error creating assignment");
    }
  };

  // 🔹 GET ASSIGNMENTS
  const fetchAssignments = async () => {
    try {
      const res = await API.get("/api/assignment/all");
      setAssignments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 GET SUBMISSIONS (TRACK)
  const fetchSubmissions = async () => {
    try {
      const res = await API.get("/api/assignment/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchSubmissions();
  }, []);

  return (
  <div className="dashboard">
    <div className="dashboard-container">

      <div className="main-card">

        <h2>Admin Dashboard</h2>

        {/* 🔹 CREATE ASSIGNMENT */}
        <div className="section">
          <h3>Create Assignment</h3>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <input
            type="date"
            value={duedate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <input
            placeholder="OneDrive Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <button onClick={createAssignment}>Create</button>
        </div>

        {/* 🔹 VIEW ASSIGNMENTS */}
        <div className="section">
          <h3>All Assignments</h3>

          <div className="assignment-grid">
            {assignments.map((a) => (
              <div className="assignment-card" key={a.id}>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
                <p><b>Due:</b> {a.duedate}</p>

                <a href={a.link} target="_blank" rel="noreferrer">
                  Open Link
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 TRACK SUBMISSIONS */}
        <div className="section">
          <h3>Submission Tracking</h3>

          {submissions.length === 0 && <p>No submissions yet</p>}

          <div className="assignment-grid">
            {submissions.map((s) => (
              <div className="assignment-card" key={s.id}>
                <p><b>Group:</b> {s.group_id}</p>
                <p><b>Assignment:</b> {s.assig_id}</p>
                <p><b>Status:</b> {s.status}</p>
                <p><b>Time:</b> {s.confirmed_at}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  </div>
);
}

export default AdminDashboard;