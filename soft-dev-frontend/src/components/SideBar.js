import "./SideBar.css";
const { Link, NavLink } = require("react-router-dom");
const { useState } = require("react");

const SideBar = ({ logInState, so }) => {
  let isLoggedIn = false;
  if (logInState) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  const signOut = () => {
    so();
    isLoggedIn = false;
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link to="/" className="a">
            Aimre
          </Link>
        </div>
        <div className="sidebar-links">
          {isLoggedIn ? (
            <>
              <NavLink to="/" className="a" id="a-home">
                <div className="a-icon">
                  <i className="fa-solid fa-house"></i>
                </div>
                <div className="a-text">Home</div>
              </NavLink>
              <NavLink to="/groups" className="a" id="a-groups">
                <div className="a-icon">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <div className="a-text">My Groups</div>
              </NavLink>
              <NavLink to="/my-tasks" className="a" id="a-tasks">
                <div className="a-icon">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <div className="a-text">My Tasks</div>
              </NavLink>
              <NavLink to="/create-group" className="a" id="a-create-group">
                <div className="a-icon">
                  <i className="fa-solid fa-circle-plus"></i>
                </div>
                <div className="a-text">Create Group</div>
              </NavLink>
              <NavLink to="/profile" className="a" id="a-profile">
                <div className="a-icon">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="a-text">Profile</div>
              </NavLink>
            </>
          ) : (
            <NavLink to="/sign-up" className="a" id="a-register">
              <div className="a-icon">
                <i className="fa-solid fa-right-to-bracket"></i>
              </div>
              <div className="a-text">Register</div>
            </NavLink>
          )}
        </div>
        <div className="sidebar-footer">
          {isLoggedIn ? (
            <>
              <NavLink to="/settings" className="a" id="a-settings">
                <div className="a-icon">
                  <i className="fa-solid fa-gear"></i>
                </div>
                <div className="a-text">Settings</div>
              </NavLink>
              <NavLink
                to="/sign-in"
                className="a"
                id="a-sign-out"
                onClick={signOut}
              >
                <div className="a-icon">
                  <i className="fa-solid fa-right-to-bracket"></i>
                </div>
                <div className="a-text">Sign-Out</div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/sign-in" className="a" id="a-sign-in">
                <div className="a-icon">
                  <i className="fa-solid fa-right-to-bracket"></i>
                </div>
                <div className="a-text">Sign-In</div>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
