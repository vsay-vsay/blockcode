import { useNavigate } from "react-router";
import "./navbar.css";
import React, { useEffect, useState } from "react";
import { vsayPng } from "~/images";

function Navbar() {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setToken(localStorage.getItem("authToken"));
    }
    setUserName(localStorage.getItem("userName"));
  }, []);

  // useEffect(() => {
  //   if (token == "" && userName == "") {
  //     navigate("/");
  //   }
  // }, [navigate, userName, token]);

  const handleSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName("");
    setToken("");

    navigate("/");
  };

  return (
    <nav>
      <div className="left">
        <div className="logo">
          <img src={vsayPng} alt="VSAY LOGO" />
          <h3>VSAY</h3>
        </div>
        <div className="options">
          <div className="setting">Setting</div>
          <div className="file">File</div>
          <div className="edit">Edit</div>
        </div>
      </div>
      <div className="right">
        <div className="join">{userName}</div>
        <div className="sign" onClick={handleSubmit}>
          Sign out
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
