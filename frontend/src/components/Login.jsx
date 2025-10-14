import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../context/customHook";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Login = () => {
   const navigate = useNavigate()
   const { setUser } = useUser(); // 👈 access setUser from context
   const [formData, setFormData] = useState({
      emailId: "badalchandrahalder99@gmail.com",
      password: "Badal1234!@",
   });

   const [message, setMessage] = useState("");

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");

      try {
      const response = await axios.post(
         "http://localhost:3000/login",
         formData,
         { withCredentials: true }
      );

      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setMessage(response.data || "Login successful! 🎉");

      // ✅ Optional: redirect after login success
      navigate("/")

      // ✅ Clear form
      setFormData({ emailId: "", password: "" });
      } catch (error) {
      console.error("Login failed:", error);
      setMessage(error.response?.data || "Login failed! ❌");
      }
   };

   return (
      <div className="signup-container">
      <h2>Login to Your Account</h2>

      <form onSubmit={handleSubmit} className="signup-form">
         <input
            type="email"
            name="emailId"
            placeholder="Email Address"
            value={formData.emailId}
            onChange={handleChange}
            required
         />

         <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
         />

         <button type="submit">Login</button>
      </form>

      {message && <p className="message">{message}</p>}
      </div>
   );
};

export default Login;
