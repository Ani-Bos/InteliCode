import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { useState,useEffect } from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./index.css"; 
import Features from "./components/Features/Features";
import Code from "./components/Code/Code";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/DashBoard/DashBoard";
import SignUp from "./pages/SignUp/SignUp";
import ResetPassword from "./components/ForgetPassword/ForgetPassword";
import Paint from "./components/Paint/PaintCanvas";
import Notes from "./components/Notes/Notes";
import Editor from "./components/Editor/Editor";
import Landing from "./components/Editor/Landing";
import Playground from "./components/Playground/Playground";
import Workspace from "./components/Workspace/Workspace";
import VideoHome from "./components/Video/VideoHome";
import Video from "./components/Video/Video.jsx"
import Question_Upload from "./components/Question_Upload/Question_Upload";
import AllProblems from "./components/AllProblems/AllProblems";
import Successful from "./components/Question_Upload/Successful";
function App() {
  //  const [hash, setHash] = useState("");

  //  useEffect(() => {
  //    // Extract the hash value from the URL
  //    const currentHash = window.location.hash;
  //    setHash(currentHash);
  //  }, []);
  return (
    // <Workspace/>
    // <AllProblems/>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/reset" element={<ResetPassword />}></Route>
        <Route exact path="/canvas" element={<Paint />}></Route>
        <Route exact path="/notes" element={<Notes />}></Route>
        <Route exact path="/editor/:id" element={<Workspace />}></Route>
        <Route exact path="/landing" element={<Landing />}></Route>
        <Route exact path="/upload" element={<Question_Upload />}></Route>
        <Route exact path="/video" element={<VideoHome />}></Route>
        <Route exact path="/:url" element={<Video />}></Route>
        <Route exact path="/question" element={<AllProblems />}></Route>
        <Route exact path="/success" element={<Successful />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
