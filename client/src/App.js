import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./component/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
