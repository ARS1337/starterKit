import { useState, Suspense, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useTranslation } from "react-i18next";
import "./i18next";

function App() {
  const [user, setuser] = useState("");
  const [token, settoken] = useState("");
  const [currLang,setcurrLang] = useState(localStorage.getItem('i18nextLng')||'')
  const { t, i18n } = useTranslation();

  useEffect(()=>{
    if(localStorage.getItem('i18nextLng')!=null){
      setcurrLang(localStorage.getItem('i18nextLng'));
    }
  },[])

  function handleClick(lang) {
    console.log(lang)
    i18n.changeLanguage(lang);
  }

  return (
    <Suspense fallback={<div>Loading ……</div>}>
      <div className="w-full h-[100vh] overflow-hidden relative">
        <div className="absolute top-4 right-4 bg-slate-400">
          <select
            onChange={(e) => {
              handleClick(e.target.value);
            }}
            className="bg-slate-300 outline-none"
          >
            <option value="en" selected={currLang=="en"}>English</option>
            <option value="hi" selected={currLang=="hi"}>Hindi</option>
          </select>
        </div>
        <Routes>
          <Route
            path="Dashboard"
            element={
              <Dashboard
                user={user}
                setuser={setuser}
                settoken={settoken}
                token={token}
                t={t}
              />
            }
          />
          <Route
            path="/"
            element={
              <Login user={user} setuser={setuser} settoken={settoken} t={t} />
            }
          />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
