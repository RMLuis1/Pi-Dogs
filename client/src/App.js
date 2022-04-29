import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./component/home";
import LandingPage from "./component/landingPage";
import Dogs from "./component/dogsDetall";
import CreateDogs from "./component/createDogs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/:id" element={<Dogs />} />
        <Route path="/Create" element={<CreateDogs />} />
      </Routes>
    </div>
  );
}

export default App;
