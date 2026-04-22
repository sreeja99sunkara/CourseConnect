import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    const res = await API.post("/api/auth/register", {
      name: form.name,
      email: form.email,
      password: form.password,
      role: "student"   
    });

    alert("Registered successfully");
    navigate("/");
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Error registering");
  }
};

  return (
    <div className="container">
        <div className="card">
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
        </div>
    </div>
  );
}

export default Register;