const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport');
app.set("port", process.env.PORT || 9212);
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
const CategoryRouter = require("./routers/movieCategoryRouter.js")
app.use("/api",CategoryRouter)
const userRouter = require("./routers/UserRouter.js");
app.use("/api", userRouter);
const movieRouter = require("./routers/testMovieRouter")
app.use("/api",movieRouter)
const adminUserRouter = require("./routers/adminUserRouter.js");
app.use("/api", adminUserRouter);
const adminCorrectionRouter = require("./routers/adminCorrectionRouter.js");
app.use("/api", adminCorrectionRouter);
const reviewRouter = require("./routers/reviewRouter")
app.use("/api",reviewRouter)
const ReservationRouter = require("./routers/ReservationRouter")
app.use("/api",ReservationRouter)

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
