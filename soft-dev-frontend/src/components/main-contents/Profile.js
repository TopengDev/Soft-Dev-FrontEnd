import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Profile = ({ logInState, changePath }) => {
  changePath("profile");

  const [profileData, setProfileData] = useState({});

  const getProfileData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProfileData(response.data);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      {logInState ? (
        <>
          <div className="profile-main-container">
            <div className="profile-card">
              <div className="profile-title">{profileData.name}</div>
              <div className="profile-info">
                <div className="profile-key">Profile Name</div>
                <div className="profile-value">: {profileData.name}</div>
                <div className="profile-key">User Email</div>
                <div className="profile-value">: {profileData.email}</div>
                <div className="profile-key">User ID</div>
                <div className="profile-value">: {profileData.id}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="main-container">Sorry you are not logged in</div>
        </>
      )}
    </>
  );
};

export default Profile;
