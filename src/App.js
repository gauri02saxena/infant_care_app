import React from "react";


import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard/*" element={<Dashboard />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
