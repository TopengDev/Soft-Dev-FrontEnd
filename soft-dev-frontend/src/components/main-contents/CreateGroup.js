import "./CreateGroup.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CreateGroup = ({ logInState, changePath }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    "new-group-title": "",
    "new-group-description": "",
    "new-group-tag": "",
    "new-group-public": "",
  });

  let token = "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: inputs["new-group-title"],
      description: inputs["new-group-description"],
      tag: inputs["new-group-tag"],
      isPublic: inputs["new-group-public"],
    };

    token = localStorage.getItem("token");
    if (token) {
      try {
        const auth = `Bearer ${token}`;
        const response = await axios.post("/api/groups", data, {
          headers: {
            Authorization: auth,
          },
        });
        navigate("/groups");
      } catch (err) {
        console.log(err);
      }
    }

    console.log(data);
  };

  useEffect(() => {
    changePath("create-group");
  }, []);

  return (
    <>
      {logInState ? (
        <>
          <div className="create-group-main-container main-container">
            <div className="form-card">
              <div className="form-title-container">Create Group</div>
              <form onSubmit={handleSubmit}>
                <div className="form-input-container">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-address-card"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter new group title"
                    name="new-group-title"
                    autoComplete="off"
                    onChange={(e) => {
                      setInputs({ ...inputs, [e.target.name]: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="form-input-container">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-note-sticky"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter some description"
                    name="new-group-description"
                    autoComplete="off"
                    onChange={(e) => {
                      setInputs({ ...inputs, [e.target.name]: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="form-input-container">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-tag"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter a group tag"
                    name="new-group-tag"
                    autoComplete="off"
                    onChange={(e) => {
                      setInputs({ ...inputs, [e.target.name]: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="form-input-container">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-door-open"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter 'yes' to make a public group"
                    name="new-group-public"
                    autoComplete="off"
                    onChange={(e) => {
                      setInputs({ ...inputs, [e.target.name]: e.target.value });
                    }}
                  />
                </div>

                <button type="submit">Create Group</button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="create-group-main-container-1">
            <h1>Sorry you are not logged in</h1>
          </div>
        </>
      )}
    </>
  );
};

export default CreateGroup;
