import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [user, setuser] = useState("");
  const [token, settoken] = useState("");
  return (
    <div className="w-full h-[100vh] overflow-hidden">
      <Routes>
        <Route path="k" element={<>sdfdfds</>} />
        <Route
          path="Dashboard"
          element={
            <Dashboard
              user={user}
              setuser={setuser}
              settoken={settoken}
              token={token}
            />
          }
        />
        <Route
          path="/"
          element={<Login user={user} setuser={setuser} settoken={settoken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
