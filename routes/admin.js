const express = require("express");
const router = express.Router();

// 대시보드
router.get("/", async (req, res) => {
    res.render("index.html");
});

// 회원 관리
router.get("/users", async (req, res) => {
    res.render("users.html");
});

// 후원 신청 현황
router.get("/sponsorship", async (req, res) => {
    res.render("sponsorship.html");
});

// 자원봉사 신청 현황
router.get("/volunteerwork", async (req, res) => {
    res.render("volunteerwork.html");
});

// 비밀상담 관리
router.get("/counsel", async (req, res) => {
    res.render("counsel.html");
});

// 공지사항 관리
router.get("/board", async (req, res) => {
    res.render("board.html");
});

// 시설 이미지 관리
router.get("/images", async (req, res) => {
    res.render("images.html");
});

// 자유 게시판 관리
router.get("/community", async (req, res) => {
    res.render("community.html");
});

// 포토 갤러리 관리
router.get("/gallery", async (req, res) => {
    res.render("gallery.html");
});

module.exports = router;