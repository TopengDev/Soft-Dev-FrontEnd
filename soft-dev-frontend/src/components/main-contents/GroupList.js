import "./GroupList.css";
import { useEffect, useState } from "react";
import OneGroupList from "./sub-components/OneGroupList";
import axios from "../../api/axios";

const GroupList = ({ logInState, changePath }) => {
  useEffect(() => {
    changePath("groups");
  }, []);

  const [groups, setGroups] = useState([]);
  let token = "";

  const getGroupsData = async () => {
    token = await localStorage.getItem("token");

    if (token) {
      try {
        const auth = `Bearer ${token}`;

        const response = await axios.get("/api/groups", {
          headers: {
            Authorization: auth,
          },
        });
        setGroups(response.data);
        console.log(groups);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Not logged in");
    }
  };

  useEffect(() => {
    getGroupsData();
  }, []);

  return (
    <>
      {logInState ? (
        <>
          <div className="main-group-list-container">
            <div className="group-list-container">
              {groups.map((group) => {
                return (
                  <OneGroupList
                    title={group.title}
                    tag={group.tag}
                    publicState={group.settings.isOpenToPublic}
                    members={group.members.length}
                    groupID={group._id}
                    key={group._id}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="main-group-list-container-1">
            <div className="group-list-container-1">Not Logged In</div>
          </div>
        </>
      )}
    </>
  );
};

export default GroupList;
