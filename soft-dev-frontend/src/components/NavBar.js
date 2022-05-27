import "./NavBar.css";

const NavBar = ({ path, name }) => {
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
              <input type="text" placeholder="Join a Group..." />
            </div>
          </div>
          <div className="nav-notif-icon">
            <i className="fa-solid fa-bell"></i>
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
