import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function Login(props) {
  const { user, setuser, settoken } = props;
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [process, setprocess] = useState("login");
  const [errors, seterrors] = useState([]);
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
    console.log(res)
    if (res.data.success === 1) {
      console.log(res.data)
      settoken(res.data.token)
      setuser(username);
      enqueueSnackbar(process + " successfull !", { variant: "success" });
      navigate("/Dashboard");
    } else {
      enqueueSnackbar(process + " failed ", { variant: "error" });
      // seterrors(res.data.errors);
      // res.data.errors.map((error) =>
      //   enqueueSnackbar(error.msg, { variant: "error" })
      // );
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]  bg-slate-300 text-white">
      <form action="">
        <div className="flex items-center justify-center flex-col gap-4 drop-shadow-xl bg-orange-400 p-8 pb-6 rounded-2xl mb-[10vh]">
          <div className="text-3xl font-thin tracking-wide mb-2">
            Login / Signup
          </div>

          <div className="flex items-center justify-between w-[100%]">
            <label className="pr-2 text-xl">Username:</label>
            <input
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              className="rounded-md p-1 outline-none text-orange-400"
              minLength={3}
              required
            />
          </div>

          <div className="flex items-center justify-between w-[100%]">
            <label className="pr-2 text-xl">Password:</label>
            <input
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="rounded-md p-1 outline-none text-orange-400"
              minLength={3}
              required
            />
          </div>

          <div className="flex items-center justify-evenly w-full">
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
              <label for="login" className="pl-2 text-xl">
                Login
              </label>
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
              <label for="signup" className="pl-2 text-xl">
                Signup
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-white p-2 rounded-md px-6 text-black font-light tracking-wide text-xl mt-2 focus:cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
