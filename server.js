const express = require("express");
const methodOverride = require("method-override");
const http = require("http");

// router
const bbsRouter = require("./routes/bbs");
const nanumteoRouter = require("./routes/nanumteo");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.engine("html", require("ejs").renderFile);

app.get("/", async (req, res) => {
    res.send("메인 페이지");
});

app.get("/program", async (req, res) => {
    res.send("프로그램 안내");
});

app.get("/sostt", async (req, res) => {
    res.send("소스뜨라");
});

app.use("/bbs", bbsRouter);
app.use("/nanumteo", nanumteoRouter);

server.listen(3000, () => {
    console.log("localhost:3000 runs");
});