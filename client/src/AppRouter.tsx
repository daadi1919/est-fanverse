import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import DaoPage from "./pages/DaoPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dao" element={<DaoPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
