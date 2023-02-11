const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user_route");
const postRoute = require("./routes/post_route");
const fileRoute = require("./routes/file_route");
const { MONGOBD_URL } = require("./config");
global.__basedir = __dirname; //please add it in notes
mongoose.set("strictQuery", true);
mongoose.connect(MONGOBD_URL);
mongoose.connection.on("connected", () => {
  console.log("Data base connected");
});

mongoose.connection.on("error", (error) => {
  console.log("DataBase Not connected");
});

app.use(cors());
app.use(express.json());
app.use("/", userRoute);
app.use("/", postRoute);
app.use("/", fileRoute);

app.listen(4000, () => {
  console.log("Terminal started at port 4000");
});
