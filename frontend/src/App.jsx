import React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import EditProfile from "./components/EditProfile";
import ViewProfile from "./components/ViewProfile";
import UserConnection from "./components/UserConnection";
import FriendRequests from "./components/FriendRequests";

function App() {
   return (
      <UserProvider>
         <BrowserRouter>
            <Navbar />

            <Routes>
               <Route path="/signup" element={<Signup />} />
               <Route path="/login" element={<Login />} />
               <Route path="/" element={<Feed />} />
               <Route path="/edit-profile" element={<EditProfile />} />
               <Route path="/view-profile" element={<ViewProfile />} />
               <Route path="/user-connections" element={<UserConnection />} />
               <Route path="/friend-requests" element={<FriendRequests />} />
            </Routes>
         </BrowserRouter>
      </UserProvider>
   );
}

export default App;
