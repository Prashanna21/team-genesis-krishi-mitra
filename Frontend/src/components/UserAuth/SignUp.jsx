import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button.jsx";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/user/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg("Signup successful!");
      } else {
        setResponseMsg(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error(err);
      setResponseMsg("Error connecting to backend.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-5 p-4 space-y-4 border rounded-md shadow bg-amber-50 "
    >
      <label className="block font-bold text-3xl text-center">Sign Up</label>
      <div>
        <label className="block font-medium">Email</label>
        <input
          type="text"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Password</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Role</label>
        <select
          value={role}
          required
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">-- Select Role --</option>
          <option value="user">User</option>
          <option value="farmer">Farmer</option>
        </select>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Button type="submit">Sign Up</Button>
        <Link to="/login">Login</Link>
      </div>
      {responseMsg && <p className="mt-2 text-center text-sm">{responseMsg}</p>}
    </form>
  );
}

export default SignupForm;
