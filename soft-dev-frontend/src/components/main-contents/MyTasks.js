import "./MyTasks.css";
import { useState, useEffect } from "react";
import OneTaskCard from "./sub-components/OneTaskCard";
import axios from "../../api/axios";

const MyTasks = ({ changePath, logInState }) => {
  changePath("my-tasks");

  const [myTasks, setMyTasks] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = async (e) => {
    await setFilter(e.target.innerHTML);
  };

  const getTaskData = async (f) => {
    const token = localStorage.getItem("token");

    if (f) {
      const response = await axios.get(`/api/tasks?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyTasks(response.data);
    } else {
      const response = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyTasks(response.data);
    }

    // console.log(response.data);
  };
  useEffect(() => {
    getTaskData();
  }, []);

  useEffect(() => {
    getTaskData(filter);
  }, [filter]);

  return (
    <>
      {logInState ? (
        <>
          <div className="my-tasks-main-container">
            <div className="my-tasks-navbar">
              <button onClick={handleFilter}>finished</button>
              <button onClick={handleFilter}>on-process</button>
              <button onClick={handleFilter}>paused</button>
            </div>
            <div className="my-tasks-box">
              {myTasks.map((task) => {
                return (
                  <OneTaskCard
                    key={task._id}
                    taskTitle={task.taskName}
                    taskDate={task.taskDueDate}
                    taskPriorityLevel={task.priorityLevel}
                    taskStatus={task.taskStatus}
                    groupName={task.groupName}
                    taskDescription={task.taskDescription}
                  />
                );
              })}
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

export default MyTasks;
