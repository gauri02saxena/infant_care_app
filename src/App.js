import './App.css';
import Home from "./Components/Home";
import Login  from "./Components/Login";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<div> About </div>}></Route>
          <Route path="/contact" element={<div> Contact </div>}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
