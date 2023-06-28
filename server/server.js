const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.set("port", process.env.PORT || 9212);
require("dotenv").config();

app.use(cors({ credentials: true, origin: "http://localhost:9212" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routers/UserRouter.js");
app.use("/api", userRouter);
const duiRouter = require("./routers/DUIRouter.js").default;
app.use("/api", duiRouter);

const movieRouter = require("./routers/testMovieRouter")
app.use("/api",movieRouter)

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});


