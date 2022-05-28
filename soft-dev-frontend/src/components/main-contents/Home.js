import "./Home.css";
import GroupsCard from "./sub-components/GroupsCard";
import TaskCard from "./sub-components/TaskCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Home = ({ logInState, changePath }) => {
  const navigate = useNavigate();

  const [tasksData, setTasksData] = useState([]);

  const getTasksData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/tasks?filter=on-process", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasksData(response.data);
  };

  useEffect(() => {
    changePath("/");
    if (!logInState) {
      navigate("/sign-up");
    }
    getTasksData();
  }, []);

  return (
    <>
      {logInState ? (
        <>
          <div className="main-home-container">
            <div className="home-top">
              <GroupsCard />
              <TaskCard />
            </div>
            <div className="home-bottom">
              <div className="home-bottom-line home-titles-line">
                <div className="home-bottom-col-1">Group</div>
                <div className="home-bottom-col-2">Task</div>
                <div className="home-bottom-col-3">Deadline</div>
              </div>
              {tasksData.map((task) => {
                return (
                  <div className="home-bottom-line">
                    <div className="home-bottom-col-1">{task.groupName}</div>
                    <div className="home-bottom-col-2">{task.taskName}</div>
                    <div className="home-bottom-col-3">{task.taskDueDate}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="main-home-container">
          <div className="home-top">Sorry you are not logged in</div>
        </div>
      )}
    </>
  );
};

export default Home;
