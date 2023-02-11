import React from "react";
import logo from "../images/logo.PNG";
import "./navbar.css";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const NavBar = () => {
  //selector
  const user = useSelector((state) => state.user);

  //declaring Dispatch
  const dispatch = useDispatch();
  //declaring Navigation
  const navigate = useNavigate();
  //declaring useselector
  //let user = useSelector((state) => state.user);
  //console.log(user);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar bg-light shadow-sm shadow-md" id="navbar">
        <div className="container-fluid">
          {localStorage.getItem("token") ? (
            <Link id="navbutton" to="/posts">
              <img
                src={logo}
                alt="logo not found"
                height="45px"
                style={{ borderRadius: "10px" }}
              />
            </Link>
          ) : (
            <Link id="navbutton" to="/login">
              <img
                src={logo}
                alt="logo not found"
                height="45px"
                style={{ borderRadius: "10px" }}
              />
            </Link>
          )}
          <form className="d-flex text-muted me-md-5 me-sm-1" role="search">
            <input
              className="searchbox form-control me-2"
              id="searchbox"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>

            <button className="form-control searchicon" id="navbutton">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Link
              className="form-control fs-6 mt-1 ms-1"
              id="navbutton"
              to="/posts"
            >
              <i className="fa-solid fa-house"></i>
            </Link>
            {/**Below we used heart button icon ,so it will only show when user is logged in*/}
            {localStorage.getItem("token") ? (
              <button className="form-control" id="navbutton">
                <i className="fa-regular fa-heart"></i>
              </button>
            ) : (
              ""
            )}
            {/*profile */}
            {/**Below we used profile pic logic ,so it will only show when user is logged in*/}
            {/**Also user is defined with useSelector hook ,which recieve user state fron userReducer*/}
            {localStorage.getItem("token") ? (
              <button
                type="button"
                className="form-control"
                id="navbuttonprofile"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                {/*profile pic */}
                <img
                  className="profilepicnavbar"
                  alt="profile pic"
                  src={user.profileImg}
                />
                {/*profile pic end */}
              </button>
            ) : (
              ""
            )}
            {/**Above we used profile pic logic ,so it will only show when user is logged in*/}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>

                  <div className="modal-body">
                    <button
                      style={{ padding: "15px", border: "none" }}
                      type="button"
                      className="form-control"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <Link
                        to="/profile"
                        className="form-control"
                        style={{ border: "none", textDecoration: "none" }}
                      >
                        <img
                          className="profilepicnavbar"
                          alt="profile pic"
                          src={user.profileImg}
                        />{" "}
                        {user.fullName}
                      </Link>
                    </button>
                    <button
                      onClick={() => logout()}
                      style={{ padding: "15px", border: "none" }}
                      type="button"
                      className="form-control"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
