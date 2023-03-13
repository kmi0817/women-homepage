const express = require("express");
const router = express.Router();
const sanitizeHtml = require("sanitize-html");
const crypto = require("crypto");
const xlsx = require("xlsx");
const path = require("path");

// database
const mysql = require("mysql");
const config = require("../config.js");
const connection = mysql.createConnection(config);

router.get("/", async (req, res) => {
    res.send("나눔터");
});

router.get("/howto", async (req, res) => {
    if (req.query.nanum === "sponsorship")
        res.send("후원 안내");
    else if (req.query.nanum === "volunteerwork")
        res.send("자원봉사 안내");
});

router.get("/applyfor", async (req, res) => {
    if (req.query.nanum === "sponsorship")
        res.send("후원 신청");
    else if (req.query.nanum === "volunteerwork")
        res.send("자원봉사 신청");
});

router.get("/counsel", async (req, res) => {
    res.send("비밀상담");
});

router.get("/counsel/:no", async (req, res) => {
    /* posting: 비밀상담 게시글, comments: 해당 게시글의 댓글 */
    let results = [];

    const no = sanitizeHtml(req.params.no);
    let sql = `SELECT * FROM counsel WHERE no=${no} and is_deleted=0 ORDER BY created_at desc LIMIT 10`; // Get a posting that is not deleted
    connection.query(sql, (error, posting) => {
        if (error) throw error;
        results.push(posting);

        sql = `SELECT * FROM counsel_comments WHERE posting_no=${no} and is_deleted=0`; // Get comments that is not deleted
        connection.query(sql, (error2, comments) => {
            if (error2) throw error2;
            results.push(comments);
            
            res.send(results);
        });
    });
});

router.post("/create", async (req, res) => {
    const nanum = sanitizeHtml(req.query.nanum);

    if (nanum === "sponsorship") {
        let sql;
        if (sanitizeHtml(req.body.method) == "CMS 자동이체") { /* CMS 자동이체일 경우 */
            sql = `INSERT INTO sponsorship(name, job, email, addr1, addr2, addr3, tel, recommender, purpose, method, withdrawal_bank, account, depositor, withdrawal_date, amount, period) VALUES('${sanitizeHtml(req.body.name)}', '${sanitizeHtml(req.body.job)}', '${sanitizeHtml(req.body.email)}', ${sanitizeHtml(req.body.addr1)}, '${sanitizeHtml(req.body.addr2)}', '${sanitizeHtml(req.body.addr3)}', '${sanitizeHtml(req.body.tel)}', '${sanitizeHtml(req.body.recommender)}', '${sanitizeHtml(req.body.purpose).replace(/'/g, "''")}', '${sanitizeHtml(req.body.method)}', '${sanitizeHtml(req.body.withdrawal_bank)}', '${sanitizeHtml(req.body.account)}', '${sanitizeHtml(req.body.depositor)}', ${sanitizeHtml(req.body.withdrawal_date)}, ${sanitizeHtml(req.body.amount)}, '${sanitizeHtml(req.body.period)}')`;
        } else {
            sql = `INSERT INTO sponsorship(name, job, email, addr1, addr2, addr3, tel, recommender, purpose, method) VALUES('${sanitizeHtml(req.body.name)}', '${sanitizeHtml(req.body.job)}', '${sanitizeHtml(req.body.email)}', ${sanitizeHtml(req.body.addr1)}, '${sanitizeHtml(req.body.addr2)}', '${sanitizeHtml(req.body.addr3)}', '${sanitizeHtml(req.body.tel)}', '${sanitizeHtml(req.body.recommender)}', '${sanitizeHtml(req.body.purpose).replace(/'/g, "''")}', '${sanitizeHtml(req.body.method)}')`;
        }
        connection.query(sql, (error, results) => {
            if (error) {
                console.log("*** ERROR: ", error["sqlMessage"], " ***");
                throw error;
            } else {
                console.log("** an application for sponsorship has been saved in DB");
                res.redirect("/nanumteo/applyfor?nanum=sponsorship");
            };
        });
    } else if (nanum === "volunteerwork") {
        const sql = `INSERT INTO volunteerwork(name, tel, hp, addr1, addr2, addr3, email, experience, description, begin_date, end_date, speak) VALUES('${sanitizeHtml(req.body.name)}', '${sanitizeHtml(req.body.tel)}', '${sanitizeHtml(req.body.hp)}', ${sanitizeHtml(req.body.addr1)}, '${sanitizeHtml(req.body.addr2)}', '${sanitizeHtml(req.body.addr3)}', '${sanitizeHtml(req.body.email)}', ${sanitizeHtml(req.body.experience)}, '${sanitizeHtml(req.body.description).replace(/'/g, "''")}', '${sanitizeHtml(req.body.begin_date)}', '${sanitizeHtml(req.body.end_date)}', '${sanitizeHtml(req.body.speak).replace(/'/g, "''")}')`;
        connection.query(sql, (error, results) => {
            if (error) {
                throw error;
            } else {
                console.log("** an application for volunteerwork has been saved in DB");
                res.redirect("/nanumteo/applyfor?nanum=volunteerwork");
            };
        });
    } else if (nanum === "counsel") {
        const title = sanitizeHtml(req.body.title).replace(/'/g, "''"); // escape '
        const writer = sanitizeHtml(req.body.writer);
        const description = sanitizeHtml(req.body.description).replace(/'/g, "''");
        const salt = crypto.randomBytes(64).toString("base64");
        const password = crypto.pbkdf2Sync(sanitizeHtml(req.body.password), salt, 198922, 64, "sha512").toString("base64");

        const sql = `INSERT INTO counsel(title, writer, description, password, salt) VALUES('${title}', '${writer}', '${description}', '${password}', '${salt}')`;
        connection.query(sql, (error, results) => {
            if (error) throw error;

            console.log(`** a counsel posting: ${title} has been saved in DB`);
            res.redirect(`/nanumteo/counsel`);
        });
    } else if (nanum === "comments") {
        const writer = sanitizeHtml(req.body.writer);
        const description = sanitizeHtml(req.body.description).replace(/'/g, "''");
        const posting_no = sanitizeHtml(req.body.posting_no);

        const sql = `INSERT INTO counsel_comments(writer, description, posting_no) VALUES('${writer}', '${description}', ${posting_no})`;
        connection.query(sql, (error, results) => {
            if (error) throw error;
            console.log(`** a counsel comment(${writer}) of ${posting_no} has been saved in DB`);
            res.redirect(`/nanumteo/counsel/${posting_no}`);
        });
    } else {
        console.log("WRONG");
        res.redirect("/nanumteo");
    }
});

router.patch("/update/:no", async (req, res) => {
    const no = sanitizeHtml(req.params.no);
    const nanum = sanitizeHtml(req.query.nanum);

    if (nanum === "counsel") {
        /* 비밀번호 일치 여부 확인 */
        connection.query(`SELECT password, salt FROM counsel WHERE no=${no}`, (error, results) => {
            const password = sanitizeHtml(req.body.password);
            const input_password = crypto.pbkdf2Sync(password, results[0]["salt"], 198922, 64, "sha512").toString("base64");

            if (input_password === results[0]["password"]) {
                const title = sanitizeHtml(req.body.title).replace(/'/g, "''"); // escape '
                const writer = sanitizeHtml(req.body.writer);
                const description = sanitizeHtml(req.body.description).replace(/'/g, "''"); // escape '
        
                const sql = `UPDATE counsel SET title='${title}', writer='${writer}', description='${description}' WHERE no=${no}`;
                connection.query(sql, (error, results) => {
                    if (error) throw error;
                    console.log(`** a counsel posting${no} has been updated`);
                });
            } else {
                console.log("** Passwords do not match");
            }

            res.redirect(`/nanumteo/counsel/${no}`);
        });
    } else if (nanum === "comments") {
        const comment_no = sanitizeHtml(req.body.comment_no);
        const writer = sanitizeHtml(req.body.writer);
        const description = sanitizeHtml(req.body.description).replace(/'/g, "''"); // escape '

        const sql = `UPDATE counsel_comments SET writer='${writer}', description='${description}' WHERE no=${comment_no}`;
        connection.query(sql, (error, results) => {
            if (error) throw error;
            console.log(`** a comment${comment_no} of counsel${no} has been updated`);
            res.redirect(`/nanumteo/counsel/${no}`);
        });
    } else {
        console.log("WRONG");
        res.redirect("/nanumteo/counsel");
    }
});

module.exports = router;