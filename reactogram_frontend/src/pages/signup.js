import socialDesktop from "../images/socialDesktop.PNG";
import socialMobile from "../images/socialMobile.PNG";
import "./signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import axios from "axios";
function Signup() {
  //setting up use state for fullname ,password and email
  const [fullName, SetFullName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  //setting up loading animation
  const [loading, SetLoading] = useState(false);
  //signup event
  const signup = (event) => {
    event.preventDefault();
    SetLoading(true);
    const requestData = { fullName: fullName, email, password };
    axios
      .post(`${API_BASE_URL}/signup`, requestData)
      .then((result) => {
        debugger;
        if (result.status === 201) {
          SetLoading(false);
          Swal.fire({
            icon: "success",
            title: "User signed up successfully",
          });
        }
        SetFullName("");
        SetEmail("");
        SetPassword("");
      })
      .catch((error) => {
        console.log(error);
        SetLoading(false);
        Swal.fire({
          icon: "error",
          title: "Signup failed , Please try again later",
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
            alt="Not available"
            style={{ height: "80%" }}
          />

          <img
            style={{ marginLeft: "3.5rem" }}
            className="socialMobile"
            src={socialMobile}
            alt="Not available"
          />
        </div>
        <div className="col-md-5 col-sm-12" id="formsection">
          <div className="card text-center" id="formcardsignup">
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
                <b>Sign Up</b>
              </h6>
            </div>
            <div className="card-body" id="cardbox">
              {/*From start here */}
              <form onSubmit={(e) => signup(e)}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control input-bg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Phone"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mb-2">
                  <input
                    value={email}
                    onChange={(ev) => SetEmail(ev.target.value)}
                    type="email"
                    className="form-control input-bg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mb-2">
                  <input
                    value={fullName}
                    onChange={(ev) => SetFullName(ev.target.value)}
                    type="text"
                    className="form-control input-bg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Full Name"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mb-2">
                  <input
                    value={password}
                    onChange={(ev) => SetPassword(ev.target.value)}
                    type="password"
                    className="form-control input-bg"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    style={{ padding: "5px" }}
                  ></input>
                </div>
                <div className="mt-3 d-grid">
                  <button
                    type="submit"
                    className="custom-btn custom-btn-blue"
                    style={{ width: "100%" }}
                  >
                    Sign Up
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
                      Already have an account?
                    </span>
                    <Link to="/login" className="ms-1 text-info fw-bold">
                      Log In
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
export default Signup;
