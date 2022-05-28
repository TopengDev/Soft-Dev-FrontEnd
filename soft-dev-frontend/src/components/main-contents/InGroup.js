import "./InGroup.css";
import GroupContent from "./sub-components/GroupContent";
import { useEffect, useState } from "react";

const InGroup = ({ changePath, logInState }) => {
  changePath("group");

  const [activeButton, setActiveButton] = useState("in-group-seg-2-btn-1");
  const [groupContent, setGroupContent] = useState(1);
  const [groupTitle, setGroupTitle] = useState("");

  // const asd = (a) => {
  //   a();
  // };

  const changeGroupTitle = (title) => {
    setGroupTitle(title);
    // console.log(title);
  };

  const handleClick = (e) => {
    if (e.target.id != activeButton) {
      document
        .querySelector(`#${e.target.id}`)
        .classList.add("in-group-seg-2-button-active");
      document
        .querySelector(`#${activeButton}`)
        .classList.remove("in-group-seg-2-button-active");
      setActiveButton(e.target.id);
      setGroupContent(e.target.id.charAt(e.target.id.length - 1));
    }
  };
  useEffect(() => {
    document
      .querySelector(`#${activeButton}`)
      .classList.add("in-group-seg-2-button-active");
  }, []);

  const groupId = "";

  return (
    <>
      <div className="in-group-main-container">
        <div className="in-group-card">
          <div className="in-group-seg-1">
            <div className="seg-i">
              <i className="fa-solid fa-people-group"></i>
            </div>
            <p>{groupTitle}</p>
          </div>
          <div className="in-group-seg-2">
            <div className="in-group-seg-2-buttons">
              <div
                className="in-group-seg-2-button-container"
                onClick={handleClick}
                id="in-group-seg-2-btn-1"
              >
                Group Info
              </div>
              <div
                className="in-group-seg-2-button-container"
                onClick={handleClick}
                id="in-group-seg-2-btn-2"
              >
                Group Tasks
              </div>
              <div
                className="in-group-seg-2-button-container"
                onClick={handleClick}
                id="in-group-seg-2-btn-3"
              >
                Group Members
              </div>
              <div
                className="in-group-seg-2-button-container"
                onClick={handleClick}
                id="in-group-seg-2-btn-4"
              >
                Group Settings
              </div>
            </div>
            <div className="in-group-seg-2-displayer">
              <div className="in-group-seg-2-displayer-box">
                <GroupContent
                  groupContent={groupContent}
                  changeGroupTitle={changeGroupTitle}
                  logInState={logInState}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InGroup;
