import React, { useState } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (event) => {
    axios.defaults.withCredentials = true;
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/resetPassword`, {
        token,
        newPassword,
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="text"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
