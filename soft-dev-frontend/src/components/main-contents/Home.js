import "./Home.css";
import GroupsCard from "./sub-components/GroupsCard";
import { useEffect } from "react";

const Home = ({ logInState, changePath }) => {
  useEffect(() => {
    changePath("/");
  }, []);

  return (
    <>
      {logInState ? (
        <>
          <div className="main-home-container">
            <div className="home-top">
              <GroupsCard />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="main-home-container">
            <h1>Sorry, you are not logged in</h1>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
