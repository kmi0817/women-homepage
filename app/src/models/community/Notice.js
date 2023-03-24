"use strict";

const NoticeStorage = require("./NoticeStorage");

class Notice {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const notice = this.body;
        try {
            const response = await NoticeStorage.save(notice);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        try {
            const notice = this.body;
            const response = await NoticeStorage.getNotices(notice.pageNo);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Notice;