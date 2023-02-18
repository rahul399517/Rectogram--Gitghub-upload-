import React, { useEffect, useState } from "react";
import Card from "../components/card";
import "../pages/postoverview.css";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config";

const PostOverview = () => {
  //creating config_obj to configure the authorized user
  const CONFIG_OBJ = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const [allposts, setAllPosts] = useState([]);
  const GetAllPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/allposts`);
    //debugger;
    if (response.status === 200) {
      setAllPosts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured",
      });
    }
  };
  useEffect(() => {
    GetAllPosts();
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
      GetAllPosts();
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured",
      });
    }
  };
  return (
    <div className="container mt-md-5 mt-3 ">
      <div className="row" style={{ marginTop: "7px" }}>
        {allposts
          .map((post) => {
            return (
              <div
                className="col-md-3  col-sm-12 mb-sm-2"
                id="postspace"
                key={post._id}
              >
                {" "}
                <Card
                  postData={post}
                  deletePost={deletePost}
                  GetAllPosts={GetAllPosts}
                />{" "}
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default PostOverview;
