import React from "react";
import Feed from "../Components/Feed/Feed";
import Head from "./Helper/Head";

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title="Fotos" description="Home do site, com o feed" />
      <Feed />
    </section>
  );
};

export default Home;
