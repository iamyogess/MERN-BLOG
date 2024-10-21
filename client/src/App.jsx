import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SinglePage from "./pages/SinglePage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singlepage/5" element={<SinglePage />} />
      </Routes>
    </>
  );
};

export default App;
