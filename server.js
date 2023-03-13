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

// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");
// app.use(methodOverride("_method"));
// app.engine("html", require("ejs").renderFile);

// database
const mysql = require("mysql");
const config = require("./config.js");
const { dirname } = require('path/posix');
const connection = mysql.createConnection(config);

const path = require('path');
const publicDirectoryPath = path.join(__dirname, '/front-end');
app.use(express.static(publicDirectoryPath))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve('front-end', "index.html"));
});


app.get("/", async (req, res) => {
    /* bbs_new: 새글 소식, board_new: 공지사항, history: 연혁 */
    let results = [];

    let sql = `SELECT no, bbs, title, created_at FROM bbs ORDER BY created_at desc LIMIT 8`;
    connection.query(sql, (error, bbs_new) => {
        if (error) throw error;
        results.push(bbs_new);

        sql = `SELECT no, title, created_at FROM bbs WHERE bbs='board' ORDER BY created_at desc LIMIT 8`;
        connection.query(sql, (error2, board_new) => {
            if (error2) throw error2;
            results.push(board_new);

            sql = `SELECT year, description FROM history`;
            connection.query(sql, (error3, history) => {
                if (error3) throw error3;
                results.push(history);
                
                res.send(results);
            });
        });
    });
});

app.get("/program", async (req, res) => {
    const sql = `SELECT title, description FROM program`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.get("/sostt", async (req, res) => {
    let sql = `SELECT sosttIs, facility FROM sostt`; // 소스뜨라는? & 시설소개
    connection.query(sql, (error, results) => {
        if (error) throw error;

        sql = `SELECT year, month, description FROM facility_history`; // 시설 연혁
        connection.query(sql, (error2, results2) => {
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