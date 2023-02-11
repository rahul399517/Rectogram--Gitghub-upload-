import React, { useState } from "react";
import "../pages/profile.css";
import axios from "axios";
import horizontalMoreAction from "../images/horizontalMoreAction.PNG";
import Modal from "react-bootstrap/Modal";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Profile = () => {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState("");
  const [postdetail, setPostDetail] = useState({});

  //popup show details
  const showdetail = (post) => {
    setPostDetail(post);
  };
  //declaring navgate
  const navigate = useNavigate();
  //selector
  const user = useSelector((state) => state.user);
  //creating config_obj to congigure the authorized user
  const CONFIG_OBJ = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer" + localStorage.getItem("token"),
    },
  };
  //To hande the file select
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
  };

  // To handle image upload
  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append("file", image.data);
    //API calling below
    const response = axios.post(`${API_BASE_URL}/uploadfile`, formData);
    return response;
  };
  //To add post
  const addPost = async () => {
    if (image.preview === "") {
      Swal.fire({
        icon: "error",
        title: "Post image is Mandatory",
      });
    } else if (description === "") {
      Swal.fire({
        icon: "error",
        title: "Caption is Mandatory",
      });
    } else if (location === "") {
      Swal.fire({
        icon: "error",
        title: "Location is Mandatory",
      });
    } else {
      setLoading(true);
      const imgRes = await handleImgUpload();
      //Add validation Rule for the Caption /Location
      const request = {
        description: description,
        location: location,
        image: `${API_BASE_URL}/files/${imgRes.data.fileName}`,
      };
      //API call to create post
      const postResponse = await axios.post(
        `${API_BASE_URL}/createpost`,
        request,
        CONFIG_OBJ
      );
      setLoading(false);
      if (postResponse === 201) {
        navigate("/posts");
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong while creating post ",
        });
      }
    }
  };

  /*pop up for zoom picture */

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*pop up for upload picture */

  const [upload, setUpload] = useState(false);

  const handleuploadClose = () => setUpload(false);
  const handleuploadShow = () => setUpload(true);

  //To show profile images
  const [allmyposts, setMyAllPosts] = useState([]);
  const GetMyAllPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/myallposts`, CONFIG_OBJ);
    //debugger;
    if (response.status === 200) {
      setMyAllPosts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured",
      });
    }
  };
  useEffect(() => {
    GetMyAllPosts();
  }, []);
  //API call for delete post
  const deletePost = async (postId) => {
    console.log(postId);
    //debugger;
    const response = await axios.delete(
      `${API_BASE_URL}/deletepost/${postId}`,
      CONFIG_OBJ
    );
    if (response.status === 200) {
      GetMyAllPosts();
      setShow(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured",
      });
    }
  };
  return (
    <div className="container  mt-2" id="profilecontainer">
      {/*profile pic upload edit buttons etc */}
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <img
            className="profilepagepic"
            alt="profile pic"
            src={user.profileImg}
          />
          <p
            className=""
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              fontWeight: "550",
            }}
          >
            {user.email}
          </p>
          <p className="bio small">{user.fullName}</p>
          <p className="bio small">Photographer || Follow </p>
          <p className="bio small"> collabs @{user.email}</p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-around mx-auto">
            <div className="  fw-bold pe-md-6 pe-4" id="follower">
              <h4>{allmyposts?.length}</h4>
              <p>posts</p>
            </div>
            <div className=" fw-bold px-md-5 px-4" id="follower">
              <h4>20</h4>
              <p>Followers</p>
            </div>
            <div className=" fw-bold ps-md-5 ps-4" id="followerX">
              <h4>30</h4>
              <p>Following</p>
            </div>
          </div>
          <div className="d-flex justify-content-equal mx-auto mt-md-0 mt-3">
            <button className="custom-profile custom-btn-profile me-md-3">
              <span className=" fs-6">Edit Profile</span>
            </button>

            <button
              className="custom-profile custom-btn-profile"
              onClick={handleuploadShow}
            >
              <span className=" fs-6">Upload Post</span>
            </button>
          </div>
        </div>
      </div>
      {/*HR tag */}
      <div className="row fy-3">
        <div className="col-sm-12">
          <hr />
        </div>
      </div>
      {/* picture rows */}
      <div className="row mb-4 " style={{ marginLeft: "-25px" }}>
        {/* Here we will loop the user post with .map method*/}
        {allmyposts &&
          allmyposts.map((post) => {
            return (
              <div className="col-md-3  col-sm-12 mb-sm-2" id="postspace">
                {" "}
                <div className="col-md-4 col-sm-3" id="divcard" key={post._id}>
                  <div className="card" id="profilepost" onClick={handleShow}>
                    <img
                      onClick={() => showdetail(post)}
                      className="card-img-top img-fluid p-1"
                      alt={post.description}
                      src={post.image}
                    />
                  </div>
                </div>{" "}
              </div>
            );
          })}
      </div>

      {/*pop up for zoom picture */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="true"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>

                {/**Slide show  image popups */}
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={postdetail.image}
                      className="d-block w-100"
                      alt="Not available"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1673129864372-aeddcb6a2634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                      className="d-block w-100"
                      alt="Not available"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1671516962086-72e19da77a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                      className="d-block w-100"
                      alt="Not available"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>{" "}
            </div>
            <div className="col-md-6">
              {/*profile pic and username row*/}
              <div className="row mt-2">
                <div className="col-6 d-flex" style={{ paddingLeft: "20px" }}>
                  <img
                    className="profilepic"
                    alt="profile pic"
                    src={user.profileImg}
                  />
                  <div
                    className=" felx-coloumn justify-content-centre"
                    style={{ paddingLeft: "7px" }}
                  >
                    <h6>{user.fullName}</h6>
                    <p style={{ marginTop: "-7px", fontSize: "small" }}>
                      {postdetail.location}
                    </p>
                    <p style={{ marginTop: "-7px", fontSize: "small" }}>
                      {postdetail.description}
                    </p>
                  </div>
                </div>
                {/*horizontal action button */}

                <button
                  className="form-control "
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                  style={{ border: "none", width: "20%", marginLeft: "7vw" }}
                  id="horizontalaction"
                >
                  <img src={horizontalMoreAction} alt="Not available" />
                </button>

                <div
                  className="offcanvas offcanvas-start "
                  tabIndex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div className="offcanvas-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <div>
                      <button
                        type="button"
                        className="form-control"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        style={{
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none",
                          padding: "15px",
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>Edit Post
                      </button>
                      <button
                        style={{
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none",
                          padding: "15px",
                        }}
                        onClick={(e) => deletePost(e)}
                        type="button"
                        className="form-control"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <i className="fa-solid fa-trash"></i> Delete Post
                      </button>
                      <button
                        style={{
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none",
                          padding: "15px",
                        }}
                        type="button"
                        className="form-control"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <i className="fa-solid fa-download"></i>Save Post
                      </button>
                      <button
                        style={{
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none",
                          padding: "15px",
                        }}
                        type="button"
                        className="form-control"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <i className="fa-solid fa-star"></i>Add to favourates
                      </button>
                      <button
                        style={{
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none",
                          padding: "15px",
                        }}
                        type="button"
                        className="form-control"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <i className="fa-solid fa-chart-simple"></i>Get Insights
                      </button>
                      <button
                        style={{
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "none",
                          padding: "15px",
                        }}
                        type="button"
                        className="form-control"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <i className="fa-solid fa-box-archive"></i>Archive
                      </button>
                    </div>
                  </div>
                </div>

                {/*horizontal action button */}
              </div>

              {/*Likes and share row  */}
              <div className="row mt-2">
                <div className="col-6 d-flex" style={{ paddingLeft: "20px" }}>
                  <button className="form-control" id="lovecommentsharebutton">
                    <p className="fw-bold">
                      <i className="fa-regular fa-heart"></i>
                    </p>
                  </button>

                  <button className="form-control" id="lovecommentsharebutton">
                    <i className="fa-regular fa-comment"></i>
                  </button>
                  <button className="form-control" id="lovecommentsharebutton">
                    <i className="fa-solid fa-location-arrow"></i>
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
                    3,747 likes
                  </p>
                </div>
              </div>
              {/*View all comments */}
              <div className="row">
                <div className="col-sm-12">
                  <p
                    style={{
                      marginTop: "-5px",
                      fontSize: "small",
                      marginLeft: "15px",
                    }}
                  >
                    view all comments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*pop up for upload picture*/}
      <Modal show={upload} onHide={handleuploadClose} size="lg" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-3">Upload Post</span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              {/*----------------------------*UPLOAD IMAGE SECTION !IMPORTANT ------------------------------------------------ */}
              <div className="uploadbox">
                {image.preview && (
                  <img
                    src={image.preview}
                    id="imagepreview"
                    alt="Something went wrong"
                  ></img>
                )}
                <div className="dropZoneContainer">
                  <input
                    name="file"
                    type="file"
                    id="drop_zone"
                    className="FileUpload"
                    accept=".jpg,.png,.gif,.jpeg"
                    onChange={handleFileSelect}
                  />
                  <div className="dropZoneOverlay">
                    {/**here to add */}
                    <i className="fa-solid fa-cloud-arrow-up fs-1"></i>
                    <br></br>
                    Drag or Drop your image. <br></br>
                    <b>OR</b>
                    <br></br>Click to add
                  </div>
                </div>
              </div>
              {/*UPLOAD SECTION END HERE*/}
            </div>
            <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-sm-12 mb-3 mt-3">
                  <div className="form-floating">
                    <textarea
                      value={description}
                      onChange={(ev) => setDescription(ev.target.value)}
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea"
                    ></textarea>
                    <label for="floatingTextarea">Add Caption</label>
                  </div>
                </div>
                <div className=" col-sm-12 mb-3">
                  <div className="form-floating mb-3">
                    <input
                      value={location}
                      onChange={(ev) => setLocation(ev.target.value)}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Add Location"
                    />
                    <label for="floatingInput">
                      <i className="fa-solid fa-location-dot"></i>Add Location
                    </label>
                  </div>
                </div>
              </div>
              {/*post button */}
              <div className="row">
                <div className="col-sm-12 mb-3 ">
                  {/*Adding the loading animation on top of the card  */}
                  {loading ? (
                    <div className="row">
                      <div className="col-md-12">
                        {/*Adding spinner code from bootstrap */}
                        <div
                          className="spinner-border text-warning"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => addPost()}
                    className="custom-profile custom-btn-upload float-end"
                  >
                    <span className=" fs-6 fw-700">Upload Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
