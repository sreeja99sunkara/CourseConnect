import React, { useState, useEffect } from "react";
import API from "../services/api";
import '../dashboard.css';

function Dashboard() {
  const [assignments, setAssignments] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const fetchAssignments = async () => {
  try {
    const res = await API.get("/api/assignment");
    setAssignments(res.data);
  } catch (err) {
    console.log("FULL ERROR:", err.response?.data);
    alert("Error loading assignments");
  }
};

  useEffect(() => {
    fetchAssignments();
  }, []);

  // CREATE GROUP
  const createGroup = async () => {
    const res = await API.post("/api/group/create", { name: groupName });
    setGroupId(res.data.groupid);
    alert("Group created");
  };

  // ADD MEMBER
  const addMember = async () => {
    await API.post("/api/group/add-member", {
      groupId,
      email: memberEmail,
    });
    alert("Member added");
  };

  // SUBMIT
  const submitAssignment = async (assignmentId) => {
  if (!groupId) {
    alert("Please create/select a group first");
    return;
  }

  try {
    await API.post("/api/submission/submit", {
      assignmentId,
      groupId,
    });

    alert("Submitted");
    fetchAssignments();

  } catch (err) {
    console.log(err.response?.data);
    alert("Submission failed");
  }
};

  // ACKNOWLEDGE (LEADER ONLY)
  const acknowledge = async (groupId) => {
    await API.post("/api/submission/acknowledge", { groupId });
    alert("Acknowledged");
    fetchAssignments();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="main-card">

          <h2>Student Dashboard</h2>

          {/* GROUP */}
          <div className="section">
            <h3>Create Group</h3>
            <input
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button onClick={createGroup}>Create</button>
          </div>

          <div className="section">
            <h3>Add Member</h3>
            <input
              placeholder="Email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
            <button onClick={addMember}>Add</button>
          </div>

          {/* ASSIGNMENTS */}
          <div className="section">
            <h3>Assignments</h3>

            <div className="assignment-grid">
              {assignments.map((a) => (
                <div key={a.id} className="assignment-card">

                  <h4>{a.title}</h4>
                  <p>{a.description}</p>
                  <div className="progress-container">
                    <div className="progress-fill"
                        style={{width: a.status === "acknowledged"? "100%": a.status === "submitted"? "60%": "10%",}}
                      />
                  </div>

                  <p>
                    Status: 
                    <b style={{ color:
                      a.status === "acknowledged" ? "green" :
                      a.status === "submitted" ? "blue" : "orange"
                    }}>
                      {" "}{a.status}
                    </b>
                  </p>

                  {/* SUBMIT */}
                  {a.status === "pending" && (
                    <button onClick={() => submitAssignment(a.id)}>
                      Submit
                    </button>
                  )}

                  {/* ACKNOWLEDGE */}
                  {a.isLeader && a.status === "submitted" && (
                    <button onClick={() => acknowledge(a.groupId)}>
                      Acknowledge
                    </button>
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

export default Dashboard;