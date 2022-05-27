import "./SignIn.css";
import axios from "../../api/axios";
import Modal from "./Modal";
const { useRef, useState, useEffect } = require("react");
const { useNavigate } = require("react-router-dom");

const SignIn = ({ logIn, changePath }) => {
  useEffect(() => {
    changePath("Sign In");
  }, []);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password: pwd };

      const response = await axios.post("/api/users/login", data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        logIn(response.data.name, response.data._id, true, true);

        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data.message);
        setModalMessage(error.response.data.message);
        setModal(true);
        setTimeout(() => {
          setModal(false);
          setModalMessage("");
        }, 5000);
      }
    }
  };

  return (
    <>
      <div className="main-container">
        <Modal
          message={modalMessage}
          classN={modal ? "modalActive" : "modalInactive"}
        />
        <div className="form-card">
          <div className="form-title-container-1">Sign In</div>
          <form className="form-1" onSubmit={handleSubmit}>
            <div className="form-input-container-1">
              <div className="input-icon-container">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-input-container-1">
              <div className="input-icon-container">
                <i className="fa-solid fa-key"></i>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          <div className="form-platforms-container">
            <div className="form-footer-title">Or sign in with</div>
            <div className="platform-icons-container">
              <button>
                <img
                  src="https://img.icons8.com/color/48/000000/telegram-app--v1.png"
                  alt="telegram"
                />
              </button>
              <button>
                <img
                  src="https://img.icons8.com/color/48/000000/gmail-new.png"
                  alt="gmail"
                />
              </button>
              <button>
                <img
                  src="https://img.icons8.com/color/48/000000/facebook.png"
                  alt="facebook"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
