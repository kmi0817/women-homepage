const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const sanitizeHtml = require("sanitize-html");
const crypto = require("crypto");
const xlsx = require("xlsx");
const path = require("path");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "women"
});

connection.connect((error) => {
    if (error) {
        console.erroror("mysql connection erroror");
        console.log(error);
        throw error;
    } else {
        console.log("DB OK");
    }
});

// 대시보드
router.get("/", async (req, res) => {
    res.send("대시보드");
});

// 회원 관리
router.get("/users", async (req, res) => {
    const sql = `SELECT no, name, id, created_at FROM users`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

// 관리자 정보
router.get("/mypage", async (req, res) => {
    res.send("관리자 정보 페이지");
});

// 후원 신청 현황
router.get("/sponsorship", async (req, res) => {
    const sql = `SELECT * FROM sponsorship`;
    connection.query(sql, (error, results, fields) => {
        res.send(results);
    });
});

// 자원봉사 신청 현황
router.get("/volunteerwork", async (req, res) => {
    const sql = `SELECT * FROM volunteerwork`;
    connection.query(sql, (error, results, fields) => {
        res.send(results);
    });
});

// 비밀상담 관리
router.get("/counsel", async (req, res) => {
    res.send("비밀상담 관리 페이지");
});

// 공지사항 관리
router.get("/board", async (req, res) => {
    connection.query("SELECT * FROM board", (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

// 시설 이미지 관리
router.get("/images", async (req, res) => {
    connection.query("SELECT * FROM images", (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

// 자유 게시판 관리
router.get("/community", async (req, res) => {
    connection.query("SELECT * FROM community", (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

// 포토 갤러리 관리
router.get("/gallery", async (req, res) => {
    connection.query("SELECT * FROM gallery", (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

/* 회원 CRUD */
router.post("/register", async (req, res) => {
    const name = sanitizeHtml(req.body.name);
    const id = sanitizeHtml(req.body.id);
    const salt = crypto.randomBytes(64).toString("base64");
    const password = crypto.pbkdf2Sync(sanitizeHtml(req.body.password), salt, 198922, 64, "sha512").toString("base64");

    const sql = `INSERT INTO users(name, id, password, salt) VALUES('${name}', '${id}', '${password}', '${salt}')`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        console.log(`a user(${name}) has been registered in DB`);
        res.redirect("/admin/users");
    });
});

router.delete("/withdraw/:no", async (req, res) => {
    const sql = `UPDATE users SET is_withdrawn=1 WHERE no=${req.params.no}`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        console.log(`a user${req.params.no} has been withdrawn from DB`);
        res.redirect(`/admin/users`);
    })
});

router.patch("/change/:no", async (req, res) => {
    const field = sanitizeHtml(req.query.field);
    const no = sanitizeHtml(req.params.no);

    if (field === "name") {
        const name = sanitizeHtml(req.body.name);
        const sql = `UPDATE users SET name='${name}' WHERE no=${no}`;
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            console.log(`name of user${no} has been changed`);
        });
    } else if (field === "password") {
        connection.query(`SELECT * FROM users WHERE no=${no}`, (error, results, fields) => {
            if (error) throw error;
    
            // apply hash algorithm to input password
            const originalPassword = sanitizeHtml(req.body.originalPassword);
            const input_password = crypto.pbkdf2Sync(originalPassword, results[0]["salt"], 198922, 64, "sha512").toString("base64");
    
            // check if hashed input password and hashed password saved in DB match
            if (input_password === results[0]["password"]) {
                const salt = crypto.randomBytes(64).toString("base64"); // new salt value
                const new_password = crypto.pbkdf2Sync(sanitizeHtml(req.body.newPassword), salt, 198922, 64, "sha512").toString("base64"); // new hashed password
                
                const sql = `UPDATE users SET salt='${salt}', password='${new_password}' WHERE no=${no}`;
                connection.query(sql, (error, results, fields) => {
                    if (error) throw error;
                    console.log(`password of user${no} has been changed`);
                });
            } else { console.log("password do not match"); }
        });
    } else {
        console.log("unacceptable request to change");
    }
    res.redirect("/admin/mypage");
});

// Users: Export to XLSX
router.get("/export", async (req, res) => {
    const param = req.query.data;

    if (param === "users") {
        connection.query("SELECT * FROM users", (error, results, fields) => {
            if (error) throw error;
    
            let data = [];
            results.forEach((row) => {
                data.push([
                    row["no"],
                    row["name"],
                    row["id"],
                    row["password"],
                    row["salt"],
                    row["created_at"]
                ]);
            });
    
            let worksheet = xlsx.utils.aoa_to_sheet(data),
                workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, "temp");
            xlsx.writeFile(workbook, "static/temp.xlsx");
            console.log(path.join(__dirname, "../static/temp.xlsx"));
            res.sendFile(path.join(__dirname, "../static/temp.xlsx"));
        });
    }
});

/* 연혁, 게시글 C-UD (Create, Update, Delete) */
router.post("/create", async (req, res) => {
    const menu = sanitizeHtml(req.query.menu);

    if (menu === "history") { /* 연혁 */
        const year = sanitizeHtml(req.body.year);
        const month = sanitizeHtml(req.body.month);
        const description = sanitizeHtml(req.body.description);

        const sql = `INSERT INTO history(year, month, description) VALUES('${year}', '${month}', '${description}')`;
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            console.log("a history has been created");
            res.send(results);
        });
    } else if (menu === "bbs") { /* 게시판 */
        const bbs = sanitizeHtml(req.query.bbs); // 게시판 종류

        const title = sanitizeHtml(req.body.title);
        const writer = sanitizeHtml(req.body.writer);
        const description = sanitizeHtml(req.body.description).replace(/\\n/g, '<br>'); // 개행문자를 <br> 태그로 변경함

        const sql = `INSERT INTO ${bbs}(title, writer, description) VALUES('${title}', '${writer}', '${description}')`;
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            console.log(`a posting: ${title} in ${bbs} has been created`);
            res.redirect(`/admin/${bbs}`);
        });
    } else {
        console.log("WRONG");
        res.redirect(`/admin`);
    }
});

router.patch("/update/:no", async (req, res) => {
    const no = sanitizeHtml(req.params.no);
    const menu = sanitizeHtml(req.query.menu);

    if (menu === "history") { /* 연혁 */
        const year = sanitizeHtml(req.body.year);
        const month = sanitizeHtml(req.body.month);
        const description = sanitizeHtml(req.body.description);

        const sql = `UPDATE history SET year=${year}, month=${month}, description='${description}' WHERE no=${no}`;
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            console.log(`a history${no} has been updated`);
            res.send(results);
        })
    } else if (menu === "bbs") { /* 게시판 */
        const bbs = sanitizeHtml(req.query.bbs);

        const title = sanitizeHtml(req.body.title);
        const description = sanitizeHtml(req.body.description).replace(/\\n/g, '<br>');

        const sql = `UPDATE ${bbs} SET title='${title}', description='${description}' WHERE no=${no}`;
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            console.log(`a posting: ${title} in ${bbs} has been updated in DB`);
            res.redirect(`/admin/${bbs}`);
        });
    } else {
        console.log("WRONG");
        res.redirect(`/admin`);
    }
});

router.delete("/delete/:no", async (req, res) => {
    const no = sanitizeHtml(req.params.no);
    const menu = sanitizeHtml(req.query.menu);

    if (menu === "history") { /* 연혁 */
        const sql = `DELETE FROM history WHERE no=${no}`;
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            console.log(`a history${no} has been deleted`);
            res.send(results);
        });
    } else if (menu === "bbs") { /* 게시판 */
        const bbs = sanitizeHtml(req.query.bbs);
        const sql = `UPDATE ${bbs} SET is_deleted=1 WHERE no=${no}`;
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            console.log(`a posting${no} in ${bbs} has been deleted`);
            res.redirect(`/admin/${bbs}`);
        });
    } else {
        console.log("WRONG");
        res.redirect(`/admin`);
    }
});

module.exports = router;