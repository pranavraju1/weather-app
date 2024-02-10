import "./App.scss";
import React from "react";
import Home from "./components/home/Home";
import NavigationBar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import State from "./components/state/State";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state" element={<State />} />
      </Routes>
    </>
  );
};

export default App;
