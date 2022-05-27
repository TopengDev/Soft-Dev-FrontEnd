import "./OneGroupList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OneGroupList = ({ title, members, tag, publicState, groupID }) => {
  const navigate = useNavigate();
  const groupPath = `/groups/${groupID}`;

  const handleClick = () => {
    console.log(groupID);
    navigate(groupPath);
  };

  return (
    <>
      <div className="group-list" onClick={handleClick}>
        <div className="group-list-top">{title}</div>
        <div className="group-list-bottom">
          <div className="seg" id="seg1">
            <div className="seg-i">
              <i className="fa-solid fa-people-group"></i>
            </div>
            {members}
          </div>
          <div className="seg" id="seg2">
            {tag}
          </div>
          <div className="seg" id="seg3">
            {publicState ? "Public" : "Private"}
          </div>
        </div>
      </div>
    </>
  );
};

export default OneGroupList;
