import React, { useState } from "react";

function SignupForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
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
      className="max-w-md mx-auto p-4 space-y-4 border rounded-md shadow bg-amber-50"
    >
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
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

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Sign Up
      </button>

      {responseMsg && <p className="mt-2 text-center text-sm">{responseMsg}</p>}
    </form>
  );
}

export default SignupForm;
