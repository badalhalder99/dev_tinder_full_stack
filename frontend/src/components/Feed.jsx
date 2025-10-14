import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/customHook";
import { useNavigate } from "react-router-dom";

const Feed = () => {
   const [users, setUsers] = useState([]);
   const { user } = useUser();
   const navigate = useNavigate();
   const [page, setPage] = useState(1);
   const [limit] = useState(5);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const fetchUsers = async (pageNum) => {
      setLoading(true);
      try {
      const response = await axios.get(`http://localhost:3000/feed?page=${pageNum}&limit=${limit}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
      });
      setUsers(response.data);
      } catch (err) {
      setError(err.response?.data?.message || err.message);
      } finally {
      setLoading(false);
      }
   };

   useEffect(() => {
      if (!user) {
         navigate("/login");
         return;
      }
      fetchUsers(page);
   }, [page]);

   const handleNextPage = () => {
      setPage((prev) => prev + 1);
   };

   const handlePrevPage = () => {
      if (page > 1) {
      setPage((prev) => prev - 1);
      }
   };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Discover People</h2>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
            />
            <h3 className="text-lg font-semibold text-center">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600 text-center">Age: {user.age}</p>
            <p className="text-gray-600 text-center">Gender: {user.gender}</p>
            <p className="text-gray-700 mt-2">{user.about}</p>
            {user.skills.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Skills:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-5">
                 <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
            >
              Ignore
                 </button>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Interested
            </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feed;
