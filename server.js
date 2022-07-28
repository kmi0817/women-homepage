const express = require("express");
const methodOverride = require("method-override");
const http = require("http");

// router
const bbsRouter = require("./routes/bbs");
const nanumteoRouter = require("./routes/nanumteo");
const adminRouter = require("./routes/admin");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.engine("html", require("ejs").renderFile);

// database
const mysql = require("mysql");
const config = require("./config.js");
const connection = mysql.createConnection(config);

app.get("/", async (req, res) => {
    const sql = `SELECT year, month, description FROM history`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

app.get("/program", async (req, res) => {
    const sql = `SELECT title, description FROM program`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

app.get("/sostt", async (req, res) => {
    let sql = `SELECT sosttIs, facility FROM sostt`; // 소스뜨라는? & 시설소개
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;

        sql = `SELECT year, month, description FROM facility_history`; // 시설 연혁
        connection.query(sql, (error2, results2, fields2) => {
            if (error2) throw error2;

            results.push(results2);
            res.send(results);
        });
    });
});

app.use("/bbs", bbsRouter);
app.use("/nanumteo", nanumteoRouter);
app.use("/admin", adminRouter);

server.listen(3000, () => {
    console.log("localhost:3000 runs");
});