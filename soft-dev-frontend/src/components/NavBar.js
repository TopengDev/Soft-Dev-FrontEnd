import "./NavBar.css";
import { useState, useEffect } from "react";
import axios from "../api/axios";

const NavBar = ({ path, name }) => {
  const [input, setInput] = useState("");

  const handleJoin = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `/api/groups/${input}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInput("");
    } catch (err) {
      setInput("");
      console.log(err.response);
    }
  };

  let profileName = "";
  let title = "";
  if (name) {
    profileName = name;
  } else {
    profileName = "Signed Out";
  }
  if (path == "/") {
    title = "Overview";
  } else {
    title = path;
  }

  return (
    <>
      <nav>
        <div className="nav-seg-1">
          <div className="nav-icon">
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="nav-title">{title}</div>
        </div>
        <div className="nav-seg-2">
          <div className="nav-search-bar">
            <div className="nav-search-bar-inner">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Join a Group..."
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
          <div className="nav-notif-icon">
            <i
              className="fa-solid fa-file-signature join-button"
              onClick={handleJoin}
            ></i>
          </div>
        </div>
        <div className="nav-seg-3">
          <div className="nav-profile-picture"></div>
          <div className="nav-profile-name">{profileName}</div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
