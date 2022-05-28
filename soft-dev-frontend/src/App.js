import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Register from "./components/main-contents/Register";
import SignIn from "./components/main-contents/SignIn";
import Home from "./components/main-contents/Home";
import GroupList from "./components/main-contents/GroupList";
import CreateGroup from "./components/main-contents/CreateGroup";
import InGroup from "./components/main-contents/InGroup";
import CreateTask from "./components/main-contents/CreateTask";
import MyTasks from "./components/main-contents/MyTasks";
import Profile from "./components/main-contents/Profile";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenExists, setTokenExists] = useState(false);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/sign-up");
  //   }
  // }, []);

  const [currentPath, setCurrentPath] = useState("/");

  const changePath = (path) => {
    if (path != currentPath) {
      setCurrentPath(path);
    }
  };

  const loggingIn = (n, id, iln, te) => {
    setName(n);
    setUserID(id);
    setIsLoggedIn(iln);
    setTokenExists(te);
  };
  const signingOut = () => {
    localStorage.removeItem("token");
    setName("");
    setUserID("");
    setIsLoggedIn(false);
    setTokenExists(false);
  };

  window.onunload = () => {
    localStorage.clear();
  };

  return (
    <>
      <Router>
        <div className="container">
          <div className="grid-container">
            <Routes>
              <Route
                path="/"
                element={
                  <Home logInState={isLoggedIn} changePath={changePath} />
                }
              />
              <Route
                path="/sign-up"
                element={<Register changePath={changePath} />}
              />
              <Route
                path="/sign-in"
                element={<SignIn logIn={loggingIn} changePath={changePath} />}
              />
              <Route
                path="/create-group"
                element={
                  <CreateGroup
                    logInState={isLoggedIn}
                    changePath={changePath}
                  />
                }
              />
              <Route
                path="/groups"
                element={
                  <GroupList logInState={isLoggedIn} changePath={changePath} />
                }
              />
              <Route
                path="/groups/:id"
                element={
                  <InGroup logInState={isLoggedIn} changePath={changePath} />
                }
              />
              <Route
                path="/groups/:id/create-task"
                element={
                  <CreateTask logInState={isLoggedIn} changePath={changePath} />
                }
              />
              <Route
                path="/my-tasks"
                element={
                  <MyTasks logInState={isLoggedIn} changePath={changePath} />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile logInState={isLoggedIn} changePath={changePath} />
                }
              />
            </Routes>
            <NavBar name={name} path={currentPath} />
            <SideBar logInState={isLoggedIn} so={signingOut} />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
