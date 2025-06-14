import React from "react";
import SignupForm from "../components/UserAuth/SignUp.jsx";

function SignupPage() {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-emerald-200 to-emerald-100">
      <div className="w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-lg bg-white">
        <div className="flex items-center justify-center p-8">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
