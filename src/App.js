import { useState, Suspense, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useTranslation } from "react-i18next";
import "./i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import NewLogin from "./components/Newlogin";

function App() {
  const [user, setuser] = useState("");
  const [token, settoken] = useState("");
  const [currLang, setcurrLang] = useState(
    localStorage.getItem("i18nextLng") || ""
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem("i18nextLng") != null) {
      setcurrLang(localStorage.getItem("i18nextLng"));
    }
    if (localStorage.getItem("token") != null) {
      settoken(localStorage.getItem("token"));
    }
  }, []);

  function handleClick(lang) {
    console.log(lang);
    i18n.changeLanguage(lang);
  }

  return (
    <div className='App'>

    <Suspense fallback={<div>Loading ……</div>}>
      <div className="text-[#2b2b2b] w-full h-[100vh] overflow-hidden relative font-rubik-medium">
        <div className="absolute top-4 right-4 bg-transparent">
          <select
            onChange={(e) => {
              handleClick(e.target.value);
            }}
            className="bg-transparent outline-none border-0 px-2 pb-1"
          >
            <option value="en" selected={currLang == "en"}>
              English
            </option>
            <option value="hi" selected={currLang == "hi"}>
              Hindi
            </option>
          </select>
        </div>
        <Routes>
          <Route
            path="NewLogin"
            element={
              <NewLogin
                user={user}
                setuser={setuser}
                settoken={settoken}
                token={token}
                t={t}
              />
            }
          />
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
              !token ? (
                <Login
                  user={user}
                  setuser={setuser}
                  settoken={settoken}
                  token={token}
                  t={t}
                />
              ) : (
                <Dashboard
                  user={user}
                  setuser={setuser}
                  settoken={settoken}
                  token={token}
                  t={t}
                />
              )
            }
          />
        </Routes>
      </div>
    </Suspense>
    </div>
  );
}

export default App;
