const express = require("express");
const router = express.Router();
const sanitizeHtml = require("sanitize-html");
const multer = require("multer");
const path = require("path");
var serveStatic = require("serve-static");

// database
const mysql = require("mysql");
const config = require("../config.js");
const connection = mysql.createConnection(config);

const app = express();
app.use(express.static("public"));

app.use("/upload",serveStatic(path.join(__dirname,"uploads"))); //use앞은 가상주소(upload) / 뒤에는 실제 주소 

var storage = multer.diskStorage({
    destination:function(req, file, callback) {
        callback(null, "upload");
    },
    filename:function(req, file, callback) {
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extension);
        var date = Date.now(); // 파일 중복 방지용으로 업로드 시간 추가

        callback(null, basename + "_" + date + extension); // 이름_date.확장자
    }
});

var upload = multer({
    storage:storage,
    limits: {
        files: 10, // 한 번에 최대 10개 업로드 가능
        fileSize:1024*1024*1024 // 업로드 가능한 최대 파일 크기
    }
});

/* 게시판 메인화면 겸 공지사항 페이지 */
router.get("/board", async (req, res) => {
    let pageNo = Number(sanitizeHtml(req.query.pageNo)) || 1;
    const startNo = (pageNo-1) * 10;

    const sql = `SELECT * FROM bbs WHERE bbs='board' and is_deleted=0 ORDER BY created_at DESC LIMIT ${startNo}, 10`; // startNo번째부터 10개의 레코드를 가져온다
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.get("/board/:no", async (req, res) => {
    const no = sanitizeHtml(req.params.no);

    let sql = `SELECT * FROM bbs WHERE no=${no} and is_deleted=0`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        const filename = results[0]["filename"] // DB에 저장된 파일 이름
        const full_filename = path.join(__dirname, "../upload", filename); // 파일의 절대 경로
        res.sendFile(full_filename); // sendFle은 1개의 파일만 보낼 수 있다.
    });
});

/* 시설 이미지 */
router.get("/images", async (req, res) => {
    const sql = `SELECT * FROM bbs WHERE bbs='images'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

/* 자유 게시판 */
router.get("/community", async (req, res) => {
    const sql = `SELECT * FROM bbs WHERE bbs='community'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

/* 포토 갤러리 */
router.get("/gallery", async (req, res) => {
    const sql = `SELECT * FROM bbs WHERE bbs='gallery'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

router.post("/create", upload.array('uploadfile'), (req, res) => {
    const bbs = sanitizeHtml(req.query.bbs);

    const title = sanitizeHtml(req.body.title).replace(/'/g, "''"); // escape '
    const writer = sanitizeHtml(req.body.writer);
    const description = sanitizeHtml(req.body.description).replace(/'/g, "''");
    const files = req.files; // request 객체에 업로드된 파일 존재

    let sql;
    if (files.length > 0) { /* 업로드 파일 존재할 경우 */
        let filename = [];
        files.forEach((fname) => {
            filename.push(fname.filename);
        });
        console.log(filename);
        sql = `INSERT INTO bbs(bbs, title, writer, description, filename) VALUES('${bbs}', '${title}', '${writer}', '${description}', '${filename}')`;
    } else { /* 업로드 파일 없을 경우 */
        sql = `INSERT INTO bbs(bbs, title, writer, description) VALUES('${bbs}', '${title}', '${writer}', '${description}')`;
    }

    connection.query(sql, (error, results) => {
        if (error) throw error;

        console.log(`** a ${bbs} posting: ${title} has been saved in DB`);
        res.redirect(`/bbs/${bbs}`);
    });
});

module.exports = router;