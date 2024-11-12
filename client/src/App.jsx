import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/home/HomePage";
import SinglePage from "./pages/SinglePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ExploreAll from "./pages/ExploreAll";
import AddPost from "./pages/admin/pages/AddPost";
import UpdatePost from "./pages/admin/pages/UpdatePost";
import ManagePost from "./pages/admin/pages/ManagePost";
import ManageUsers from "./pages/admin/pages/ManageUsers";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/pages/AdminDashboard";
import CreateCategory from "./pages/admin/pages/CreateCategory";
import Comment from "./components/Comment/Comment";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<ExploreAll />} />
        <Route path="/single-page/:id" element={<SinglePage />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="update-post/:slug" element={<UpdatePost />} />
          <Route path="manage-posts" element={<ManagePost />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
