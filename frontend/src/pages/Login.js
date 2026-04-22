import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await API.post("/api/auth/login", {
      email,
      password,
    });

    // Save token
    localStorage.setItem("token", res.data.token);

    // Save role
    localStorage.setItem("role", res.data.user.role);

    alert("Login successful");

    // ROLE BASED REDIRECT
    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }

  };

  return (
  <div className="container">
    <div className="card">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p className="link-text" onClick={() => navigate("/register")}>
        Not registered? Register
      </p>
    </div>
  </div>
);
}

export default Login;