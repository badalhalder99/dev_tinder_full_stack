// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// axios.defaults.withCredentials = true;

// const Signup = () => {
//    const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     emailId: "",
//     password: "",
//     gender: "",
//     age: "",
//     about: "",
//     skills: "",
//     photoUrl: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       setMessage("");

//       try {
//          const formattedSkills = formData.skills
//             ? formData.skills
//                .split(" ")
//                .map((skill) => skill.trim())
//                .filter((skill) => skill !== "") // remove empty values
//             : [];

//          const response = await axios.post(
//             "http://localhost:3000/signup",
//             { ...formData, skills: formattedSkills },
//             { withCredentials: true }
//          );

//          setMessage(response.data || "Signup successful! 🎉");

//          // Reset form fields
//          setFormData({
//             firstName: "",
//             lastName: "",
//             emailId: "",
//             password: "",
//             gender: "",
//             age: "",
//             about: "",
//             skills: "",
//             photoUrl: "",
//          });
//          navigate("/")
//       } catch (error) {
//          console.error("Signup failed:", error);
//          setMessage(error.response?.data || "Signup failed! ❌");
//       }
//    };


//   return (
//     <div className="signup-container">
//       <h2>Create Your Account</h2>

//       <form onSubmit={handleSubmit} className="signup-form" >
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="emailId"
//           placeholder="Email Address"
//           value={formData.emailId}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="age"
//           placeholder="Age"
//           value={formData.age}
//           onChange={handleChange}
//         />

//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="others">Others</option>
//         </select>

//         <input
//           type="text"
//           name="skills"
//           placeholder="Skills (space separated)"
//           value={formData.skills}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="photoUrl"
//           placeholder="Photo URL (optional)"
//           value={formData.photoUrl}
//           onChange={handleChange}
//         />

//         <textarea
//           name="about"
//           placeholder="Write something about yourself..."
//           value={formData.about}
//           onChange={handleChange}
//         ></textarea>

//          <button type="submit">Sign Up</button>
//          <h5 className="text-[14px] text-black text-center">Already have an Account? <Link to="/login" className="underline hover:no-underline">Login</Link></h5>
//       </form>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/customHook";

axios.defaults.withCredentials = true;

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
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
            .filter((skill) => skill !== "")
        : [];

      const response = await axios.post(
        "http://localhost:3000/signup",
        { ...formData, skills: formattedSkills },
        { withCredentials: true }
      );

      // Set user in context for automatic login
      const userData = {
        _id: response.data.data._id,
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        emailId: response.data.data.emailId,
        photoUrl: response.data.data.photoUrl,
        skills: response.data.data.skills,
        about: response.data.data.about,
        age: response.data.data.age,
        gender: response.data.data.gender,
        token: response.data.data.token,
      };
      setUser(userData);

      setMessage("Signup successful! 🎉");

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

      // Navigate to feed
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage(error.response?.data || "Signup failed! ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="emailId"
            placeholder="Email Address"
            value={formData.emailId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="photoUrl"
            placeholder="Photo URL (optional)"
            value={formData.photoUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="about"
            placeholder="Write something about yourself..."
            value={formData.about}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
          <h5 className="text-sm text-black text-center">
            Already have an Account?{" "}
            <Link to="/login" className="underline hover:no-underline">
              Login
            </Link>
          </h5>
        </form>

        {message && (
          <p className={`text-center mt-4 ${message.includes("failed") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
