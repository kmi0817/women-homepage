const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send("게시판 메인화면 겸 공지사항 페이지");
});

router.get("/images", async (req, res) => {
    res.send("시설 이미지");
});

router.get("/community", async (req, res) => {
    res.send("자유 게시판");
});

router.get("/gallery", async (req, res) => {
    res.send("포토 갤러리");
});

module.exports = router;