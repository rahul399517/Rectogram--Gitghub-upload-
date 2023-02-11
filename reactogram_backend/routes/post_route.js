const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const PostModel = require("../models/Post_model");
const protectedRoute = require("../middleware/protectedResource");
//All user posts
router.get("/allposts", (req, res) => {
  PostModel.find()
    .populate("author", "_id fullName profileImg")
    .populate("comments.commentedBy", "_id fullName ")
    .then((dbPosts) => {
      res.status(200).json({ posts: dbPosts });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All posts only from logged in user
router.get("/myallposts", protectedRoute, (req, res) => {
  PostModel.find({ author: req.user._id })
    .populate("author", "_id fullName profileImg")
    .then((dbPosts) => {
      res.status(200).json({ posts: dbPosts });
    })
    .catch((error) => {
      console.log(error);
    });
});
//Create a new post
router.post("/createpost", protectedRoute, (req, res) => {
  const { description, location, image } = req.body;
  if (!description || !location || !image) {
    return res.status(400).json({ error: "Please enter mandatory fields" });
  }
  req.user.password = undefined;
  const postObj = new PostModel({
    description: description,
    location: location,
    image: image,
    author: req.user,
  });
  postObj
    .save()
    .then((newPost) => {
      res.status(201).json({ post: newPost });
    })
    .catch((error) => {
      console.log(error);
    });
});
//To delete Post
router.delete("/deletepost/:postId", protectedRoute, (req, res) => {
  PostModel.findOne({ _id: req.params.postId })
    .populate("author", "_id")
    .exec((error, postFound) => {
      if (error || !postFound) {
        return res.status(400).json({ error: "Post does notr exist" });
      }
      //Check if the post author is same as logged in user , only then allow deletion
      if (postFound.author._id.toString() === req.user._id.toString()) {
        postFound
          .remove()
          .then((data) => {
            res.status(200).json({ result: data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
});
//rest API for like the post
router.put("/like", protectedRoute, (req, res) => {
  PostModel.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  ) //return updated record
    .populate("author", "_id fullName")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        res.json(result);
      }
    });
});
//Rest API to Unlike the post
router.put("/unlike", protectedRoute, (req, res) => {
  PostModel.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ) //return updated record
    .populate("author", "_id fullName")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        res.json(result);
      }
    });
});
//Rest API for the Adding comment
router.put("/comment", protectedRoute, (req, res) => {
  const comment = {
    commentText: req.body.commentText,
    commentBy: req.user._id,
  };
  PostModel.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  ) //return updated record
    .populate("comments.commentedBy", "_id fullName") //for comment owner
    .populate("author", "_id fullName") //for post owner
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        res.json(result);
      }
    });
});
module.exports = router;
