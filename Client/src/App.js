import { BrowserRouter as Router, Route, Routes, BrowserRouter  } from "react-router-dom";
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
function App() {
  return (
    <Notes/>
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Home />} />
    //     <Route exact path="/login" element={<Login />} />
    //     <Route exact path="/dashboard" element={<Dashboard />} />
    //     <Route exact path="/signup" element={<SignUp />} />
    //     <Route exact path="/reset" element={<ResetPassword />}></Route>
    //     <Route exact path="/canvas" element={<Paint />}></Route>
    //     <Route exact path="/notes" element={<Notes />}></Route>
    //   </Routes>
    // </Router>
  );
}
export default App;
