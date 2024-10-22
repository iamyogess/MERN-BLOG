import React from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<ExploreAll />} />
        <Route path="/singlepage/5" element={<SinglePage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="update-post" element={<UpdatePost />} />
          <Route path="manage-posts" element={<ManagePost />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
