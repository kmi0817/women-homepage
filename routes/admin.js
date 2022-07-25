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

connection.connect((err) => {
    if (err) {
        console.error("mysql connection error");
        console.log(err);
        throw err;
    } else {
        console.log("DB OK");
    }
});

// 대시보드
router.get("/", async (req, res) => {
    res.render("index");
});

// 회원 관리
router.get("/users", async (req, res) => {
    const sql = `SELECT no, name, id, created_at FROM users`;
    connection.query(sql, (err, ret, fields) => {
        if (err) throw err;
        res.render("users", { users: ret});
    });
});

// 관리자 정보
router.get("/mypage", async (req, res) => {
    res.render("mypage", { name: "관리자", id: "admin", created_at: "2009-08-08 13:02:19" });
});

// 후원 신청 현황
router.get("/sponsorship", async (req, res) => {
    res.render("sponsorship");
});

// 자원봉사 신청 현황
router.get("/volunteerwork", async (req, res) => {
    res.render("volunteerwork");
});

// 비밀상담 관리
router.get("/counsel", async (req, res) => {
    res.render("counsel");
});

// 공지사항 관리
router.get("/board", async (req, res) => {
    res.render("board");
});

// 시설 이미지 관리
router.get("/images", async (req, res) => {
    res.render("images");
});

// 자유 게시판 관리
router.get("/community", async (req, res) => {
    res.render("community");
});

// 포토 갤러리 관리
router.get("/gallery", async (req, res) => {
    res.render("gallery");
});

// 회원 등록
router.post("/register", async (req, res) => {
    const name = sanitizeHtml(req.body.name);
    const id = sanitizeHtml(req.body.id);
    const salt = crypto.randomBytes(64).toString("base64");
    const password = crypto.pbkdf2Sync(sanitizeHtml(req.body.password), salt, 198922, 64, "sha512").toString("base64");

    const sql = `INSERT INTO users(name, id, password, salt) VALUES('${name}', '${id}', '${password}', '${salt}')`;
    connection.query(sql, (err, ret, fields) => {
        if (err) throw err;
        console.log(ret);
    });

    res.redirect("/admin/users");
});

// Export to XLSX
router.get("/export", async (req, res) => {
    const param = req.query.data;

    if (param === "users") {
        connection.query("SELECT * FROM users", (err, ret, fields) => {
            if (err) throw err;
    
            let data = [];
            ret.forEach((row) => {
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

// 비밀번호 변경
router.patch("/change", async (req, res) => {
    connection.query("SELECT * FROM users WHERE name='관리자' LIMIT 1", (err, ret, fields) => {
        if (err) throw err;

        // 입력 비밀번호에 해시화 적용
        const input_password = crypto.pbkdf2Sync(sanitizeHtml(req.body.originalPassword), ret[0]["salt"], 198922, 64, "sha512").toString("base64");

        if (input_password === ret[0]["password"]) { // when hashed input-password == saved password in DB
            const salt = crypto.randomBytes(64).toString("base64"); // new salt value
            const new_password = crypto.pbkdf2Sync(sanitizeHtml(req.body.newPassword), salt, 198922, 64, "sha512").toString("base64"); // new hashed password
            
            const sql = `UPDATE users SET salt='${salt}', password='${new_password}' WHERE name='관리자'`;
            connection.query(sql, (err, ret, fields) => {
                if (err) throw err;

                console.log("** Password changed");
                res.redirect("/admin/mypage");
                // res.send(`<script>alert("비밀번호가 변경되었습니다."); history.go(-1); location.reload();</script>`);
            });
        } else {
            res.send(`<script>alert("비밀번호가 일치하지 않습니다."); history.go(-1);</script>`);
        }
    });
});

/* 게시글 CRUD */
router.post("/create", async (req, res) => {
    const bbs = sanitizeHtml(req.query.bbs);
    const sql = `INSERT INTO ${bbs}(title, writer, description) VALUES('${sanitizeHtml(req.body.title)}', '${sanitizeHtml(req.body.writer)}', '${sanitizeHtml(req.body.description)}')`;
    connection.query(sql, (err, ret, fields) => {
        if (err) {
            throw err;
        } else {
            console.log(`a posting in ${bbs} has been saved in DB`);
            if (bbs === "board") {
                res.redirect("/bbs");
            } else {
                res.redirect(`/bbs/${bbs}`);
            }
        }
    })
});

module.exports = router;