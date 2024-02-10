import "./App.scss";
import React, { Suspense, lazy } from "react";
// import Home from "./components/home/Home";
import NavigationBar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/loading/Loading";
// import State from "./components/state/State";

const Home = lazy(() => import("./components/home/Home"));
const State = lazy(() => import("./components/state/State"));

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/state" element={<State />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
