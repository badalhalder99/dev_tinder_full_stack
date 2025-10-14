import React, { useState, useEffect } from "react";
import { useUser } from "../context/customHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewProfile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/profile/view", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Adjust based on your auth setup
          },
        });

        setProfile(response.data.data); // Extract data from response.data.data
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h2>
        <div className="flex flex-col items-center">
          <img
            src={profile.photoUrl || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4 object-cover"
          />
          <div className="w-full space-y-4">
            <div className="flex">
              <p className="text-base font-medium text-gray-600">First Name: </p>
              <p className="text-base text-gray-800">{profile.firstName || "N/A"}</p>
            </div>
            <div className="flex">
              <p className="text-base font-medium text-gray-600">Last Name:  </p>
              <p className="text-base text-gray-800">{ profile.lastName || "N/A"}</p>
            </div>
            <div className="flex">
              <p className="text-base font-medium text-gray-600">Age: </p>
              <p className="text-base text-gray-800">{profile.age || "N/A"}</p>
            </div>
            <div className="flex">
              <p className="text-base font-medium text-gray-600">Gender: </p>
              <p className="text-base text-gray-800">{profile.gender || "N/A"}</p>
            </div>
            <div className="flex">
              <p className="text-base font-medium text-gray-600">About: </p>
              <p className="text-base text-gray-800">{profile.about || "No bio available"}</p>
            </div>
            <div className="flex">
              <p className="text-base font-medium text-gray-600">Skills: {" "}</p>
              <p className="text-base text-gray-800">
                {profile.skills && profile.skills.length > 0
                  ? profile.skills.join(", ")
                  : "No skills listed"}
              </p>
            </div>
          </div>
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;