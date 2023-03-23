"use strict";

const output = {
    main: (req, res) => {
        res.send({ success: true, msg: "메인 화면" });
    },
}

module.exports = {
    output,
};