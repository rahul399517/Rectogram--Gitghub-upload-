import socialDesktop from "../images/socialDesktop.PNG";
import socialMobile from "../images/socialMobile.PNG";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  //setting up use state for password and email
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  //setting up loading animation
  const [loading, SetLoading] = useState(false);
  //declaring Dispatch
  const dispatch = useDispatch();
  //declaring Navigation
  const navigate = useNavigate();
  //login event
  const login = (event) => {
    event.preventDefault();

    SetLoading(true);
    const requestData = { email, password };
    axios
      .post(`${API_BASE_URL}/login`, requestData)
      .then((result) => {
        if (result.status === 200) {
          SetLoading(false);
          /*Swal.fire({
            icon: "success",
            title: "User signed up successfully",
          });*/
          //here we are creating a local storage for user data
          localStorage.setItem("token", result.data.result.token);
          localStorage.setItem("user", JSON.stringify(result.data.result.user));
          //dispatching the data to the redux store here
          dispatch({ type: "LOGIN_SUCCESS", payload: result.data.result.user });
          SetLoading(false);
          navigate("/profile");
        }
        /* SetEmail("");
        SetPassword("");*/
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response.data.error,
        });
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-md-7 col-sm-12 d-flex justify-content-content align-item-centre"
          id="imagesection"
        >
          <img
            className="socialDesktop"
            src={socialDesktop}
            alt=" Not available"
            style={{ height: "70%" }}
          />

          <img
            style={{ marginLeft: "3.5rem" }}
            className="socialMobile"
            src={socialMobile}
            alt="Not available"
          />
        </div>
        <div className="col-md-5  col-sm-12" id="formsection">
          <div className="card text-center" id="loginformcard">
            {/*Adding the loading animation on top of the card  */}
            {loading ? (
              <div className="row">
                <div className="col-md-12">
                  {/*Adding spinner code from bootstrap */}
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="card-header" style={{ backgroundColor: "white" }}>
              <h6>
                <b>Log In</b>
              </h6>
            </div>
            <div className="card-body" id="cardbox">
              {/**form */}
              <form onSubmit={(e) => login(e)}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={email}
                    onChange={(ev) => SetEmail(ev.target.value)}
                    className="form-control input-bg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Phone number ,username or Email"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(ev) => SetPassword(ev.target.value)}
                    className="form-control input-bg"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mt-3 d-grid">
                  <button
                    className="custom-btn custom-btn-blue"
                    style={{ width: "100%" }}
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
                <div className="my-3">
                  <hr className="text-muted"></hr>
                  <h6 className="text-muted text-centre">OR</h6>
                  <hr className="text-muted"></hr>
                </div>
                <div className="mt-3 mb-5 d-grid">
                  <button
                    className="custom-btn custom-btn-white"
                    style={{ width: "100%" }}
                  >
                    <span className="text-muted fs-6">
                      Don't have an account?
                    </span>
                    <Link to="/signup" className="ms-1 text-info fw-bold">
                      Sign Up
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
