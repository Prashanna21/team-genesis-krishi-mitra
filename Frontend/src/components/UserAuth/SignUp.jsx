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
      className="w-full space-y-6 bg-white border border-green-300 p-6 rounded-xl shadow-md"
    >
      <h2 className="text-3xl font-bold text-center text-emerald-700">
        Lets get you started
      </h2>

      <div>
        <label className="block mb-1 font-medium text-emerald-900">Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-emerald-900">
          Password
        </label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-emerald-900">
          Choose Role
        </label>
        <select
          type="text"
          value={role}
          required
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="user">User</option>
          <option value="farmer">Farmer</option>
        </select>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Login
        </Button>
        <p className="text-sm">
          Already Have an Account?{" "}
          <Link
            to="/login"
            className="text-emerald-700 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>

      {responseMsg && (
        <p className="text-center text-sm text-red-600">{responseMsg}</p>
      )}
    </form>
  );
}

export default SignupForm;
