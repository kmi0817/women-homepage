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
        const notice = this.body;
        try {
            const response = await NoticeStorage.getNotices(notice.startNo);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async showOne() {
        const notice = this.body;
        try {
            const response = await NoticeStorage.getNotice(notice.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        const notice = this.body;
        try {
            const response = await NoticeStorage.update(notice);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        const notice = this.body;
        try {
            const response = await NoticeStorage.delete(notice.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Notice;