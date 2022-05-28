import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = () => {
  const navigate = useNavigate();
  const [taskCount, setTaskCount] = useState(0);
  let token = "";

  const getData = async () => {
    try {
      token = await localStorage.getItem("token");
      if (token) {
        const auth = `Bearer ${token}`;
        const response = await axios.get("/api/tasks?filter=on-process", {
          headers: {
            Authorization: auth,
          },
        });

        setTaskCount(response.data.length);
      } else {
        return "null";
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="group-card" onClick={() => navigate("/my-tasks")}>
      <div className="group-card-top">
        <div className="group-card-count">{taskCount.toString()}</div>
        <div className="group-card-i">
          <i className="fa-solid fa-scroll"></i>
        </div>
      </div>
      <div className="group-card-bottom">Tasks</div>
    </div>
  );
};

export default TaskCard;
