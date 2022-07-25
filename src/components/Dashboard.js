import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { useSnackbar } = require("notistack");

function Dashboard(props) {
  const { token, settoken, t } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    console.log("token start: ", token);
    if (token) {
      axios
        .post(
          "http://localhost:3001/protectedRoute",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((r) => {
          console.log("res ", r);
        })
        .catch((err) => {
          try {
            enqueueSnackbar("Not Authorised! ");
            enqueueSnackbar("Please login first!");
            navigate("/");
            console.log("err ", err);
          } catch (err) {
            console.log(err);
          }
        });
    } else {
      navigate("/");
    }
    console.log("token end: ", token);
  }, []);
  return (
    <div className="bg-slate-300 w-full h-full flex items-center justify-center flex-col">
      <div>{t("dashboard")}</div>
      <button
        onClick={() => {
          settoken("");
          localStorage.setItem("token", "");
          navigate('/')
        }}
        className='text-blue-500'
      >
        logout
      </button>
    </div>
  );
}

export default Dashboard;
