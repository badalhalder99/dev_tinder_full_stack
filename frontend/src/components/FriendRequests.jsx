import React, { useState, useEffect } from "react";
import { useUser } from "../context/customHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FriendRequests = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/user/requests/pending", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true, // Include cookies for authentication
        });

        setRequests(response.data.data); // Extract requests from response.data.data
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch pending requests");
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, [user, navigate]);

  const handleAccept = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:3000/request/review/accepted/${requestId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setRequests(requests.filter((req) => req._id !== requestId)); // Remove accepted request
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.message || "Failed to accept request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(
        `http://localhost:3000/request/review/rejected/${requestId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setRequests(requests.filter((req) => req._id !== requestId)); // Remove rejected request
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject request");
    }
  };

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
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Pending Friend Requests</h2>
        {requests.length === 0 ? (
          <p className="text-center text-gray-600">No pending friend requests.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4"
              >
                <img
                  src={request.fromUserId.photoUrl || "https://via.placeholder.com/100"}
                  alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                  className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                />
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-800">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => handleAccept(request._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequests;