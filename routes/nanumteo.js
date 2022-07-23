const { application } = require("express");
const express = require("express");
const router = express.Router();

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

module.exports = router;