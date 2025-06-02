import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

import React, { useState } from "react";
import loginImg from "../assets/Images/login.webp";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "demo5@studyblocks.com" && password === "demopassword") {
      // Store a fake token and reload
      localStorage.setItem("demo-token", "demo5");
      window.location.href = "/dashboard/upload-video";
    } else {
      setError("Only demo5@studyblocks.com / demopassword allowed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 32, border: "1px solid #eee", borderRadius: 12, background: "#fafbfc" }}>
      <img src={loginImg} alt="login" style={{ width: 60, margin: "0 auto 16px auto", display: "block" }} />
      <h2 style={{ textAlign: "center" }}>Instructor Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", marginBottom: 12 }} />
        <button type="submit" style={{ width: "100%", padding: 8, background: "#007bff", color: "white", border: 0, borderRadius: 6 }}>Login</button>
      </form>
      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      <div style={{ marginTop: 24, color: "#888", fontSize: 13, textAlign: "center" }}>
        Only <b>demo5@studyblocks.com</b> / <b>demopassword</b> can log in for demo.
      </div>
    </div>
  );
}


export default Login