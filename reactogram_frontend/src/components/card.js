import React, { useState } from "react";
import "../components/card.css";
import moreAction from "../images/moreAction.PNG";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useEffect } from "react";
const Card = (props) => {
  //creating comment section
  const [allcomment, setAllComment] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const submitcomment = async (postId) => {
    setCommentBox(false);
    const request = { postId: postId, commentText: comment };
    const response = await axios.put(
      `${API_BASE_URL}/comment`,
      request,
      CONFIG_OBJ
    );
    if (response.status === 200) {
      props.GetAllPosts();
    }
  };
  //creating config_obj to configure the authorized user
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  //likes
  const likeDislikepost = async (postId, type) => {
    const request = { postId: postId };
    const response = await axios.put(
      `${API_BASE_URL}/${type}`,
      request,
      CONFIG_OBJ
    );
    if (response.status === 200) {
      props.GetAllPosts();
    }
  };
  let user = useSelector((state) => state.user);
  //console.log(user._id);
  //console.log(props.postData.author);
  useEffect(() => {}, []);
  return (
    <div>
      <div className="card shadow-sm " id="card">
        <div className="card-body px-0" id="cardbox">
          {/*profile pic and username row*/}
          <div className="row">
            <div className="col-6 d-flex" style={{ paddingLeft: "20px" }}>
              <img
                className="profilepic"
                alt="profile pic"
                src={props.postData.image}
              />
              <div
                className=" felx-coloumn justify-content-centre"
                style={{ paddingLeft: "7px" }}
              >
                <h6></h6>
                <p style={{ marginTop: "-7px", fontSize: "small" }}>
                  {props.postData.location}
                </p>
              </div>
            </div>
            {/*I used author instead of author._id because it was showing it as 'undefined'  on console*/}
            {props.postData.author === user._id ? (
              <div className="col-6">
                <span className="float-end fs-3 p2">
                  <img
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#verticalaction"
                    style={{ cursor: "pointer" }}
                    src={moreAction}
                    alt="Not available"
                  />

                  {/*<!-- Modal -->*/}
                  <div
                    className="modal fade"
                    id="verticalaction"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
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
                            onClick={() => props.deletePost(props.postData._id)}
                            style={{ padding: "15px", border: "none" }}
                            type="button"
                            className="form-control"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Delete Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-sml-12">
              {/*Below img-fluid in bootstrap (I removed it ,cannot be found below) property help us to make image responsible  */}
              <img
                style={{ borderRadius: "2px" }}
                className="img"
                src={props.postData.image}
                alt={props.postData.description}
              />
            </div>
          </div>
          {/*Likes and share row  */}
          <div className="row mt-2">
            <div className="col-6 d-flex" style={{ paddingLeft: "20px" }}>
              <button
                onClick={() => likeDislikepost(props.postData._id, "like")}
                className="form-control"
                id="lovecommentsharebutton"
              >
                <p className="fw-bold">
                  <i className="fa-regular fa-thumbs-up"></i>
                </p>
              </button>
              <button
                onClick={() => likeDislikepost(props.postData._id, "unlike")}
                className="form-control"
                id="lovecommentsharebutton"
              >
                <p className="fw-bold">
                  <i className="fa-regular fa-thumbs-down"></i>
                </p>
              </button>

              <button
                onClick={() => setCommentBox(true)}
                className="form-control"
                id="lovecommentsharebutton"
              >
                <i className="fa-regular fa-comment"></i>
              </button>
            </div>
            <div className="col-6">
              <span
                className="float-end fs-6  p2"
                style={{ marginLeft: "-15px" }}
              >
                2 hours ago
              </span>
            </div>
          </div>
          {/*Post time */}
          <div className="row">
            <div className="col-sm-12">
              <p
                className="fw-bold"
                style={{
                  marginTop: "-5px",
                  fontSize: "small",
                  marginLeft: "15px",
                }}
              >
                {props.postData.likes.length} likes
              </p>
            </div>
          </div>
          {/**decription */}
          <p
            style={{ marginTop: "-7px", fontSize: "small", marginLeft: "15px" }}
          >
            {props.postData.description}
          </p>
          {/**comment box text area*/}

          {commentBox ? (
            <div className="row">
              <div className="col-10">
                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    style={{ height: "25px", marginLeft: "5px" }}
                  />
                </div>
              </div>
              <div className="col-2 ">
                <button
                  onClick={() => {
                    submitcomment(props.postData._id);
                    setAllComment(true);
                  }}
                  className="form-control"
                  id="lovecommentsharebutton"
                  style={{ marginLeft: "-20px" }}
                >
                  <i className="fa-solid fa-location-arrow"></i>
                </button>
              </div>
              <p
                style={{
                  fontSize: "small",
                  marginLeft: "15px",
                  cursor: "pointer",
                }}
                className="small mx-1"
                onClick={() => setCommentBox(false)}
              >
                Close comments Box
              </p>
            </div>
          ) : (
            ""
          )}

          {/*View all comments */}
          <div className="row">
            <div className="col-sm-12">
              <button
                onClick={() => setAllComment(true)}
                className="formo-control"
                style={{
                  border: "none",
                  backgroundColor: "white",
                  marginTop: "-20px",
                }}
              >
                <p
                  style={{
                    fontSize: "small",
                    marginLeft: "15px",
                    fontWeight: "600",
                  }}
                >
                  view all comments
                </p>
              </button>
            </div>
          </div>
          {/*all comment devision*/}
          {allcomment ? (
            <>
              {props.postData.comments
                .map((comment) => {
                  return (
                    <div className="row" key={comment._id}>
                      <div className="col-12">
                        <p style={{ fontWeight: "500" }}>
                          {comment._id}:{comment.commentText}
                        </p>
                      </div>
                    </div>
                  );
                })
                .reverse()}
              <p
                style={{
                  fontSize: "small",
                  marginLeft: "15px",
                  cursor: "pointer",
                }}
                className="small mx-1"
                onClick={() => setAllComment(false)}
              >
                Close comments
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
