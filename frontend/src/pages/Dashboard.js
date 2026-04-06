import React, { useState, useEffect } from "react";
import API from "../services/api";
import '../dashboard.css';

function Dashboard() {
  const [groupName, setGroupName] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const [groups, setGroups] = useState([]);

const fetchGroups = async () => {
  const res = await API.get("/api/group/all");
  setGroups(res.data);
};

useEffect(() => {
  fetchAssignments();
  fetchGroups();
}, []);
  //Add Members
  const addMember = async () => {
  if (!groupId) {
    alert("Create a group first");
    return;
  }

  try {
    await API.post("/api/group/add-member", {
      groupId,
      email: memberEmail,
    });

    alert("Member added");
    setMemberEmail("");
  } catch (err) {
    alert(err.response?.data?.message || "Error adding member");
  }
};

  // Create Group
  const createGroup = async () => {
    const res = await API.post("/api/group/create", { name: groupName });
    setGroupId(res.data.groupid);
    alert("Group created");
  };



  // Get Assignments
  const fetchAssignments = async () => {
    const res = await API.get("/api/assignment/all");
    setAssignments(res.data);
  };

  // Submit Assignment
  const submitAssignment = async (assignmentId) => {
  if (!groupId) {
    alert("Create a group first");
    return;
  }

  await API.post("/api/assignment/submit", {
    groupId,
    assignmentId,
  });
  alert("Submitted");
};

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
  <div className="dashboard">
    <div className="dashboard-container">

      <div className="main-card">

        <h2>Dashboard</h2>

        {/* 🔹 CREATE GROUP */}
        <div className="section">
          <h3>Create Group</h3>
          <input
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button onClick={createGroup}>Create</button>
        </div>

        {/* 🔹 ADD MEMBER */}
        <div className="section">
          <h3>Add Member</h3>
          <input
            placeholder="Enter member email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />
          <button onClick={addMember}>Add Member</button>
        </div>

        {/* 🔹 ASSIGNMENTS */}
        <div className="section">
          <h3>Assignments</h3>

          <div className="assignment-grid">
            {assignments.map((a) => (
              <div className="assignment-card" key={a.id}>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>

                <a href={a.link} target="_blank" rel="noreferrer">
                  Open Submission
                </a>

                <button onClick={() => submitAssignment(a.id)}>
                  Submit
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  </div>
);}

export default Dashboard;