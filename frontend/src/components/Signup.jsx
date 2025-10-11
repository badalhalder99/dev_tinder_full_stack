import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    gender: "",
    age: "",
    about: "",
    skills: "",
    photoUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");

      try {
         const formattedSkills = formData.skills
            ? formData.skills
               .split(" ")
               .map((skill) => skill.trim())
               .filter((skill) => skill !== "") // remove empty values
            : [];

         const response = await axios.post(
            "http://localhost:3000/signup",
            { ...formData, skills: formattedSkills },
            { withCredentials: true }
         );

         setMessage(response.data || "Signup successful! 🎉");

         // Reset form fields
         setFormData({
            firstName: "",
            lastName: "",
            emailId: "",
            password: "",
            gender: "",
            age: "",
            about: "",
            skills: "",
            photoUrl: "",
         });
      } catch (error) {
         console.error("Signup failed:", error);
         setMessage(error.response?.data || "Signup failed! ❌");
      }
   };


  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>

      <form onSubmit={handleSubmit} className="signup-form" >
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

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

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>

        <input
          type="text"
          name="skills"
          placeholder="Skills (space separated)"
          value={formData.skills}
          onChange={handleChange}
        />

        <input
          type="text"
          name="photoUrl"
          placeholder="Photo URL (optional)"
          value={formData.photoUrl}
          onChange={handleChange}
        />

        <textarea
          name="about"
          placeholder="Write something about yourself..."
          value={formData.about}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Sign Up</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;
