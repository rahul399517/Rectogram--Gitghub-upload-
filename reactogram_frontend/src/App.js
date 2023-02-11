import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Contactus from "./pages/contactus.js";
import PostOverview from "./pages/postoverview";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar.js";
import Profile from "./pages/profile";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
function App() {
  //Below DynamicRouting() component is created ,so that when we refresh the page ,the user data do not get lost .......
  //Also we used  DynamicRouting() component ,since App.js is first executed ,so we created a dynamic component to use 'useNavigate' function(as use Navigate function cannot be used in App.js ),
  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        navigate("/posts");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/login");
      }
    }, []);
    return (
      <Routes>
        <Route exact path="/" element={<PostOverview />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/posts" element={<PostOverview />}></Route>
        <Route exact path="/contactus" element={<Contactus />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Routes>
    );
  }
  return (
    <div className="App">
      <Router>
        <NavBar />
        <DynamicRouting />
      </Router>
    </div>
  );
}

export default App;
