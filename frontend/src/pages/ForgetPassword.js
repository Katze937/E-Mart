import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
      <button onClick={() => navigate("/login")}>Back</button>
    </div>
  );
};

export default ForgotPassword;
