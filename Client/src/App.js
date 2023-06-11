import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./index.css"; 
import Features from "./components/Features/Features";
import Code from "./components/Code/Code";
function App() {
  return (
    // <Code/>
    <Router>
      <div className="relative z-0 bg-primary">
        <div
          style={{
            backgroundImage: `url('Images/herobg.png')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Navbar />
          <Hero />
        </div>
        <Main />
        <Features/>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
