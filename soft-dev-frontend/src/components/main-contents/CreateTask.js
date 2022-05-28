import "./CreateTask.css";
import Modal from "./Modal";
import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CreateTask = ({ logInState, changePath }) => {
  changePath("create-task");
  const navigate = useNavigate();
  const groupId = window.location.href
    .split("http://localhost:3001/groups/")[1]
    .split("/")[0];
  // groupId = groupId.split("/");
  const [inputData, setInputData] = useState({
    tName: "",
    tDesc: "",
    tDate: "",
    tAssignedTo: "",
    tPriorityLevel: "",
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const auth = `Bearer ${token}`;
    const data = inputData;
    const response = await axios.post(`/api/groups/${groupId}/tasks`, data, {
      headers: {
        Authorization: auth,
      },
    });
    setInputData({
      tName: "",
      tDesc: "",
      tDate: "",
      tAssignedTo: "",
      tPriorityLevel: "",
    });

    navigate(`/groups/${groupId}`);
    // console.log(response);

    // console.log(data);
  };

  const [modal, setmodal] = useState(false);
  const [modalMessage, setmodalMessage] = useState("false");

  return (
    <>
      {logInState ? (
        <>
          <div className="main-container">
            <Modal
              message={modalMessage}
              classN={modal ? "modalActive" : "modalInactive"}
            />
            <div className="form-card">
              <div className="form-title-container-2">Create new task</div>
              <form className="form-2" onSubmit={handleCreateTask}>
                <div className="form-input-container-1">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-file-signature"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    name="tName"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-input-container-1">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-clipboard"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter task description"
                    name="tDesc"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-input-container-1">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-calendar-days"></i>
                  </div>
                  <input
                    type="date"
                    placeholder="Enter task due date"
                    name="tDate"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-input-container-1">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-user-tag"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter user id to be assigned to this task"
                    name="tAssignedTo"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-input-container-1">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter a priority level"
                    name="tPriorityLevel"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                <button type="submit" className="create-task-button">
                  Create
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="main-container">Sorry You are not logged in</div>
        </>
      )}
    </>
  );
};

export default CreateTask;
