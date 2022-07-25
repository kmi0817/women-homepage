const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const sanitizeHtml = require("sanitize-html");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "women"
});

connection.connect((err) => {
    if (err) {
        console.error("mysql connection error");
        console.log(err);
        throw err;
    } else {
        console.log("DB OK");
    }
});

router.get("/", async (req, res) => {
    res.send("나눔터");
});

router.get("/howto", async (req, res) => {
    if (req.query.nanum === "sponsorship") {
        res.send("후원 안내");
    } else if (req.query.nanum === "volunteerwork")
    res.send("자원봉사 안내");
});

router.get("/applyfor", async (req, res) => {
    if (req.query.nanum === "sponsorship") {
        res.send("후원 신청");
    } else if (req.query.nanum === "volunteerwork")
    res.send("자원봉사 신청");
});

router.get("/counsel", async (req, res) => {
    res.send("비밀상담");
});

router.post("/process", async (req, res) => {
    if (req.query.nanum === "sponsorship") {
        const sql = `INSERT INTO sponsorship(name, job, email, addr1, addr2, addr3, tel, recommender, purpose, method,withdrawal_bank, account, depositor, withdrawal_date, amount, period) VALUES('${sanitizeHtml(req.body.name)}', '${sanitizeHtml(req.body.job)}', '${sanitizeHtml(req.body.email)}', ${sanitizeHtml(req.body.addr1)}, '${sanitizeHtml(req.body.addr2)}', '${sanitizeHtml(req.body.addr3)}', '${sanitizeHtml(req.body.tel)}', '${sanitizeHtml(req.body.recommender)}', '${sanitizeHtml(req.body.purpose)}', '${sanitizeHtml(req.body.method)}', '${sanitizeHtml(req.body.withdrawal_bank)}', '${sanitizeHtml(req.body.account)}', '${sanitizeHtml(req.body.depositor)}', ${sanitizeHtml(req.body.withdrawal_date)}, ${sanitizeHtml(req.body.amount)}, '${sanitizeHtml(req.body.period)}')`;
        connection.query(sql, (err, ret, fields) => {
            if (err) {
                throw err;
            } else {
                console.log("** an application for sponsorship has been saved in DB");
                res.redirect("/nanumteo/applyfor?nanum=sponsorship");
            };
        });
    } else if (req.query.nanum === "volunteerwork") {
        const sql = `INSERT INTO volunteerwork(name, tel, hp, addr1, addr2, addr3, email, exprience, description, begin_date, end_date, speak) VALUES('${sanitizeHtml(req.body.name)}', '${sanitizeHtml(req.body.tel)}', '${sanitizeHtml(req.body.hp)}', ${sanitizeHtml(req.body.addr1)}, '${sanitizeHtml(req.body.addr2)}', '${sanitizeHtml(req.body.addr3)}', '${sanitizeHtml(req.body.email)}', ${sanitizeHtml(req.body.exprience)}, '${sanitizeHtml(req.body.description)}', '${sanitizeHtml(req.body.begin_date)}', '${sanitizeHtml(req.body.end_date)}', '${sanitizeHtml(req.body.speak)}')`;
        connection.query(sql, (err, ret, fields) => {
            if (err) {
                throw err;
            } else {
                console.log("** an application for volunteerwork has been saved in DB");
                res.redirect("/nanumteo/applyfor?nanum=volunteerwork");
            };
        });
    }
});

module.exports = router;