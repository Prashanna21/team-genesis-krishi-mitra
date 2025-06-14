"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg("Login successful!");
        if (data.role === "farmer") {
          navigate("/farmer");
        } else {
          navigate("/marketplace");
        }
      } else {
        setResponseMsg(data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      setResponseMsg("Error connecting to backend.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-5 p-4 space-y-4 border rounded-md shadow bg-amber-50"
    >
      <label className="block font-bold text-3xl text-center">Login</label>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
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

      <div className="flex flex-col items-center space-y-2">
        <Button type="submit">Login</Button>
        <Link to="/signup" className="text-blue-500 hover:underline">
          Signup
        </Link>
      </div>

      {responseMsg && (
        <p className="mt-2 text-center text-sm text-red-600">{responseMsg}</p>
      )}
    </form>
  );
}

export default LoginForm;
