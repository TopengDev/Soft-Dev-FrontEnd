import "./Register.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import Modal from "./Modal";

const Register = ({ changePath }) => {
  useEffect(() => {
    changePath("Registration");
  }, []);

  const nameRef = useRef();
  const emailRef = useRef();

  const [name, setName] = useState("");
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { name: name, email: email, password: pwd };
      const response = await axios.post("/api/users/register", userData);
      setSuccess(true);
      setEmail("");
      setPwd("");
      setName("");
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
      {success ? (
        <>
          <div className="main-container-success">
            <Modal
              message={modalMessage}
              classN={modal ? "modalActive" : "modalInactive"}
            />
            <div className="form-card-success">
              Successfully Registered! Please continue to Sign In
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="main-container">
            <Modal
              message={modalMessage}
              classN={modal ? "modalActive" : "modalInactive"}
            />
            <div className="form-card">
              <div className="form-title-container">Register</div>
              <form onSubmit={handleSubmit}>
                <div className="form-input-container">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-address-card"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    id="name"
                    ref={nameRef}
                    autoComplete="off"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                    onFocus={() => {
                      setNameFocus(true);
                    }}
                    onBlur={() => {
                      setNameFocus(false);
                    }}
                  />
                </div>
                <div className="form-input-container">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    onFocus={() => {
                      setEmailFocus(true);
                    }}
                    onBlur={() => {
                      setEmailFocus(false);
                    }}
                  />
                </div>
                <div className="form-input-container">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-key"></i>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    id="pwd"
                    autoComplete="off"
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    required
                    onFocus={() => {
                      setPwdFocus(true);
                    }}
                    onBlur={() => {
                      setPwdFocus(false);
                    }}
                  />
                </div>
                <div className="form-input-container">
                  <div className="input-icon-container">
                    <i className="fa-solid fa-key"></i>
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    id="pwd2"
                    autoComplete="off"
                    onChange={(e) => {
                      setMatchPwd(e.target.value);
                    }}
                    required
                    onFocus={() => {
                      setMatchFocus(true);
                    }}
                    onBlur={() => {
                      setMatchFocus(false);
                    }}
                  />
                </div>

                <button type="submit" disabled={!validMatch ? true : false}>
                  Register
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
                <div className="or-sign-in">
                  Already have an account?
                  <Link to="/sign-in" className="a">
                    Sign-In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
