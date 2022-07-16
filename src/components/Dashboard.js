import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { useSnackbar } = require("notistack");

function Dashboard(props) {
  const { token, settoken } = props;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (!token) {
      axios
        .post(
          "http://localhost:3001/protectedRoute",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((r) => {
          console.log("res ", r);
          settoken(r.data.token);
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
    }
    console.log(token);
  }, []);
  return <div className="">Dashboard</div>;
}

export default Dashboard;
