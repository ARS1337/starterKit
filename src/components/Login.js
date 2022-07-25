import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Input, Form, Label, Button } from "reactstrap";

function Login(props) {
  const { user, setuser, settoken, t,token } = props;
  const navigate = useNavigate();
  const [username, setusername] = useState("test");
  const [password, setpassword] = useState("test");
  const [process, setprocess] = useState("login");
  const [errors, seterrors] = useState([]);
  const [togglePassword, setTogglePassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    if (process == "login") {
      url = "http://localhost:3001/login";
    } else {
      url = "http://localhost:3001/signup";
    }
    let res = await axios.post(url, {
      user: username,
      pwd: password,
    });
    console.log(res);
    if (res.data.success === 1) {
      console.log(res.data);
      settoken(res.data.token);
      localStorage.setItem('token',res.data.token)
      setuser(username);
      // enqueueSnackbar(process + " successfull !", { variant: "success" });
      enqueueSnackbar(res.data.loginStatus, { variant: "success" });
      navigate("/Dashboard");
    } else {
      enqueueSnackbar(res.data.loginStatus, { variant: "error" });
      // seterrors(res.data.errors);
      // res.data.errors.map((error) =>
      //   enqueueSnackbar(error.msg, { variant: "error" })
      // );
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-[100vh]  bg-login-bg bg-no-repeat bg-top bg-left ">
      <div className="bg-login h-10 bg-center w-full bg-no-repeat my-4"></div>
      {/* <form action="/t" onsubmit={(e)=>{e.preventDefault()}}> */}
        <div className="w-[360px] flex items-center justify-center flex-col gap-4 drop-shadow-xl bg-white p-8 pb-6 rounded-2xl mb-[10vh]">
          <div className="text-2xl font-bold tracking-wide mb-2 text-[#2b2b2b]">
            {t("login")} / {t("signup")}
          </div>

          <div className="flex items-start justify-start w-[100%] flex-col font-rubik-medium">
            <Label className="col-form-label">{t("username")}</Label>
            <Input
              className="form-control text-gray-600"
              type="text"
              required=""
              onChange={(e) => {
                setusername(e.target.value);
              }}
              value={username}
            />
          </div>

          <div className="flex items-start justify-start w-[100%] flex-col relative font-rubik-medium">
            <Label className="col-form-label">{t("password")}</Label>
            <Input
              className="form-control"
              type={togglePassword ? "text" : "password"}
              onChange={(e) => setpassword(e.target.value)}
              defaultValue={password}
              required=""
            />
            <button
              className="absolute  h-4 w-12 flex items-center justify-center right-1 bottom-3 text-blue-500"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              <span className={togglePassword ? "" : "show"}>show</span>
            </button>
          </div>

          <div className="flex items-center justify-evenly w-full font-rubik-medium">
            <div>
              <input
                type="radio"
                name="process"
                id="login"
                checked={process === "login"}
                onChange={() => {
                  setprocess("login");
                }}
              />
              <label className="text-lg pl-2">{t("login")}</label>
            </div>
            <div>
              <input
                type="radio"
                name="process"
                id="signup"
                checked={process === "signup"}
                onChange={() => {
                  setprocess("signup");
                }}
              />
              <label className="text-lg pl-2">{t("signup")}</label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="font-rubik-medium bg-default border-gray-50 px-5 rounded-md text-white  opacity-80 p-2 hover:opacity-100"
          >
            {t("submit")}
          </button>
        </div>
      {/* </form> */}
    </div>
  );
}

export default Login;
