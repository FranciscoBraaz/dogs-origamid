import React from "react";
import Feed from "../Components/Feed/Feed";
// import UserContext from "../contexts/UserContext";
// import Loader from "./Helper/Loader";

const Home = () => {
  // const { loading } = React.useContext(UserContext);
  return (
    <section className="container mainContainer">
      <Feed />
    </section>
  );
};

export default Home;
