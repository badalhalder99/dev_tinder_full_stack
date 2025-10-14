import React, { useState, useEffect } from "react";
import { useUser } from "../context/customHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserConnection = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/user/connections", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true, // Include cookies for authentication
        });

        setConnections(response.data.data); // Extract connections from response.data.data
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch connections");
        setLoading(false);
      }
    };

    fetchConnections();
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Connections</h2>
        {connections.length === 0 ? (
          <p className="text-center text-gray-600">No friends found!</p>
        ) : (
            <>
               <p>{connections.length} friends found!</p>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {connections.map((connection) => (
                  <div
                     key={connection._id}
                     className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center space-x-4"
                  >
                     <img
                        src={connection.photoUrl || "https://via.placeholder.com/100"}
                        alt={`${connection.firstName} ${connection.lastName}`}
                        className="w-16 h-16 rounded-full mb-4 border-2 border-gray-300 object-cover"
                     />
                     <div>
                        <p className="text-base font-medium text-gray-800">
                         First Name: {connection.firstName}
                        </p>
                        <p className="text-base font-medium text-gray-800">
                         Last Name: {connection.lastName}
                        </p>
                        <p className="text-base font-medium text-gray-800">
                         Age: {connection.age}
                        </p>
                        <p className="text-base font-medium text-gray-800">
                         Gender: {connection.gender}
                        </p>
                        <p className="text-base font-medium text-gray-800">
                         Bio: {connection.about}
                        </p>
                        <button
                        className="mt-2 text-blue-600 hover:underline text-sm"
                        onClick={() => navigate(`/view-profile/${connection._id}`)}
                        >
                        View Profile
                        </button>
                     </div>
                  </div>
                  ))}
               </div>
            </>
        )}
      </div>
    </div>
  );
};

export default UserConnection;