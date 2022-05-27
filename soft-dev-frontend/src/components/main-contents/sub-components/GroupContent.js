import "./GroupContent.css";
import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const GroupContent = ({ groupContent, changeGroupTitle }) => {
  const navigate = useNavigate();
  const groupId = window.location.href.split(
    "http://localhost:3001/groups/"
  )[1];
  let token = "";
  const [addMemberInput, setAddMemberInput] = useState({
    userID: "",
  });
  const [delMemberInput, setDelMemberInput] = useState({
    userID: "",
  });
  const [publicActive, setPublicActive] = useState(false);
  const [contentType, setContentType] = useState(groupContent);
  const [groupFounderName, setGroupFounderName] = useState("");
  const [groupOwner, setGroupOwner] = useState("");
  const [groupData, setGroupData] = useState({
    title: "",
    description: "",
    tasks: [],
    members: [],
    tag: "",
    settings: {},
  });
  const handleDelGroup = async () => {
    try {
      token = localStorage.getItem("token");
      const auth = `Bearer ${token}`;
      await axios.delete(`/api/groups/${groupId}`, {
        headers: {
          Authorization: auth,
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      token = localStorage.getItem("token");
      const auth = `Bearer ${token}`;
      const data = addMemberInput;
      axios.post(`/api/groups/${groupId}`, data, {
        headers: {
          Authorization: auth,
        },
      });
      console.log(addMemberInput);
      setAddMemberInput({
        userID: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelMember = async (e) => {
    e.preventDefault();
    try {
      token = localStorage.getItem("token");
      const auth = `Bearer ${token}`;
      const data = delMemberInput;
      axios.post(`/api/groups/${groupId}/members`, data, {
        headers: {
          Authorization: auth,
        },
      });
      console.log(delMemberInput);
      setDelMemberInput({
        userID: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublicSwitch = async (e) => {
    if (publicActive) {
      try {
        token = localStorage.getItem("token");
        const auth = `Bearer ${token}`;
        const data = groupData;
        data.settings.isOpenToPublic = false;
        axios.put(`/api/groups/${groupId}`, data, {
          headers: {
            Authorization: auth,
          },
        });
        setPublicActive(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        token = localStorage.getItem("token");
        const auth = `Bearer ${token}`;
        const data = groupData;
        data.settings.isOpenToPublic = true;
        axios.put(`/api/groups/${groupId}`, data, {
          headers: {
            Authorization: auth,
          },
        });
        setPublicActive(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getGroupOwner = () => {
    groupData.members.map((member) => {
      if (member.role == "Owner") {
        setGroupOwner(member.name);
      }
    });
  };

  const getGroupFounder = async () => {
    try {
      token = localStorage.getItem("token");
      const auth = `Bearer ${token}`;
      console.log(auth);
      const response = await axios.get(
        `/api/groups/${groupData._id.toString()}/founder`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      setGroupFounderName(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGroupData = async () => {
    token = localStorage.getItem("token");

    if (token) {
      try {
        const auth = `Bearer ${token}`;
        // console.log(auth);
        const response = await axios.get(`/api/groups/${groupId}`, {
          headers: {
            Authorization: auth,
          },
        });
        console.log(response.data);
        setGroupData(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
  };
  useEffect(() => {
    console.log(groupData);
    getGroupFounder();
    getGroupOwner();
    changeGroupTitle(groupData.title);
    setPublicActive(groupData.settings.isOpenToPublic);
  }, [groupData]);
  useEffect(() => {
    getGroupData();
  }, []);
  useEffect(() => {
    getGroupData();
  }, [groupContent]);

  const renderContent = () => {
    if (groupContent == 1) {
      return (
        <>
          <div className="group-content-container">
            <div className="group-content-title group-content-line">
              <div className="group-content-title-container">Group Title :</div>
              <div className="group-content-data-container">
                {groupData.title}
              </div>
            </div>
            <div className="group-content-description group-content-line">
              <div className="group-content-title-container">
                Group Description :
              </div>
              <div className="group-content-data-container">
                {groupData.description}
              </div>
            </div>
            <div className="group-content-tag group-content-line">
              <div className="group-content-title-container">Group Tag :</div>
              <div className="group-content-data-container">
                {groupData.tag}
              </div>{" "}
            </div>
            <div className="group-content-tasks-count group-content-line">
              <div className="group-content-title-container">Tasks Count :</div>
              <div className="group-content-data-container">
                {groupData.tasks.length}
              </div>
            </div>
            <div className="group-content-members-count group-content-line">
              <div className="group-content-title-container">
                Members Count :
              </div>
              <div className="group-content-data-container">
                {groupData.members.length}
              </div>
            </div>
            <div className="group-content-founded-by group-content-line">
              <div className="group-content-title-container">Founded By :</div>
              <div className="group-content-data-container">
                {groupFounderName}
              </div>
            </div>
            <div className="group-content-current-owner group-content-line">
              <div className="group-content-title-container">
                Current Owner :
              </div>
              <div className="group-content-data-container">{groupOwner}</div>
            </div>
            <div className="group-content-group-type group-content-line">
              <div className="group-content-title-container">Group Type :</div>
              <div className="group-content-data-container">
                {groupData.settings.isOpenToPublic ? "Public" : "Private"}
              </div>
            </div>
          </div>
        </>
      );
    }
    if (groupContent == 3) {
      return (
        <>
          <div className="group-content-container">
            {groupData.members.map((member) => {
              return (
                <div key={member.userID} className="group-content-member">
                  <div className="group-content-line ">
                    <div className="group-content-title-container">
                      User ID :
                    </div>
                    <div className="group-content-data-container">
                      {member.userID}
                    </div>
                  </div>
                  <div className="group-content-line">
                    <div className="group-content-title-container">Name :</div>
                    <div className="group-content-data-container">
                      {member.name}
                    </div>
                  </div>
                  <div className="group-content-line ">
                    <div className="group-content-title-container">Role :</div>
                    <div className="group-content-data-container">
                      {member.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
    if (groupContent == 4) {
      return (
        <>
          <div className="group-content-container">
            <div className="group-content-line ">
              <div className="group-content-title-container setting-button">
                <button className="public-button" onClick={handlePublicSwitch}>
                  Switch
                </button>
                Group Type
              </div>
              <div className="group-content-data-container">
                : {publicActive ? "Public" : "Private"}
              </div>
            </div>
            <div className="group-content-line ">
              <div className="group-content-title-container setting-button">
                <button className="public-button" onClick={handleAddMember}>
                  Add
                </button>
                Add Member
              </div>
              <div className="group-content-data-container">
                :
                <input
                  className="add-member-input"
                  type="text"
                  placeholder="Enter User ID"
                  onChange={(e) =>
                    setAddMemberInput({ userID: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="group-content-line ">
              <div className="group-content-title-container setting-button">
                <button className="public-button" onClick={handleDelMember}>
                  Delete
                </button>
                Delete Member
              </div>
              <div className="group-content-data-container">
                :
                <input
                  className="add-member-input"
                  type="text"
                  placeholder="Enter User ID"
                  onChange={(e) =>
                    setDelMemberInput({ userID: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="group-content-line ">
              <div className="group-content-title-container setting-button">
                <button className="public-button" onClick={handleDelGroup}>
                  Delete
                </button>
                Delete Group
              </div>
              <div className="group-content-data-container">
                : Warning ! This will remove the group forever, and can not be
                undone !
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="group-content-main-container">{renderContent()}</div>
    </>
  );
};

export default GroupContent;
