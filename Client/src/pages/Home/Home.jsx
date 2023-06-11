import React from "react";
import Main from "../../components/Main/Main";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Features from "../../components/Features/Features";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Main />
      {/* <Features/> */}
      <Footer/>
    </div>
  );
};

export default Home;
