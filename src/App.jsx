import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
}

export default App;