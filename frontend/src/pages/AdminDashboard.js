import React, { useState, useEffect } from "react";
import API from "../services/api";
import '../dashboard.css';

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [duedate, setDueDate] = useState("");
  const [link, setLink] = useState("");

  const [assignments, setAssignments] = useState([]);
  const [analytics, setAnalytics] = useState({});

  const createAssignment = async () => {
    await API.post("/api/assignment/create", {
      title,
      desc,
      duedate,
      link,
    });

    alert("Created");
    fetchAssignments();
  };

  const fetchAssignments = async () => {
    const res = await API.get("/api/assignment");
    setAssignments(res.data);
  };

  const fetchAnalytics = async (id) => {
    const res = await API.get(`/api/assignment/${id}/submissions`);
    setAnalytics((prev) => ({ ...prev, [id]: res.data }));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="main-card">

          <h2>Professor Dashboard</h2>

          {/* CREATE */}
          <div className="section">
            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Desc" onChange={(e) => setDesc(e.target.value)} />
            <input type="date" onChange={(e) => setDueDate(e.target.value)} />
            <input placeholder="Link" onChange={(e) => setLink(e.target.value)} />
            <button onClick={createAssignment}>Create</button>
          </div>

          {/* ASSIGNMENTS */}
          <div className="section">
            <div className="assignment-grid">
              {assignments.map((a) => (
                <div key={a.id} className="assignment-card">

                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>

                  <button onClick={() => fetchAnalytics(a.id)}>
                    View Stats
                  </button>

                  {analytics[a.id] && (
                    <div>
                      {analytics[a.id].map((s, i) => (
                        <p key={i}>
                          {s.status}: {s.count}
                        </p>
                      ))}
                    </div>
                  )}

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