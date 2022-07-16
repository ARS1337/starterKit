import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [user,setuser] = useState('')
  return (
    <div className="w-full h-[100vh]">
      <Routes>
      <Route path="/" element={<Login user={user} setuser={setuser}/>} />
      </Routes>
      <Login/>
    </div>
  );
}

export default App;
