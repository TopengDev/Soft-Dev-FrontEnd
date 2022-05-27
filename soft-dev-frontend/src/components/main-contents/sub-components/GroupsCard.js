import "./GroupsCard.css";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupsCard = () => {
  const navigate = useNavigate();
  const [groupsCount, setGroupsCount] = useState(0);
  let token = "";

  const getData = async () => {
    try {
      token = await localStorage.getItem("token");
      if (token) {
        const auth = `Bearer ${token}`;
        const response = await axios.get("/api/groups", {
          headers: {
            Authorization: auth,
          },
        });

        return response;
      } else {
        return "null";
      }
    } catch (err) {
      return err.response.data;
    }
  };

  useEffect(() => {
    getData()
      .then((data) => data.data.length)
      .then((data) => {
        setGroupsCount(data);
      })
      .catch((err) => console.log("Not Logged In"));
  }, []);

  return (
    <div className="group-card" onClick={() => navigate("/groups")}>
      <div className="group-card-top">
        <div className="group-card-count">{groupsCount.toString()}</div>
        <div className="group-card-i">
          <i className="fa-solid fa-people-group"></i>
        </div>
      </div>
      <div className="group-card-bottom">Groups</div>
    </div>
  );
};

export default GroupsCard;
