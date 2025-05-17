import React from "react"
import Home from "./pages/Home"
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const container = document.querySelector(".root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  </Router>
);
