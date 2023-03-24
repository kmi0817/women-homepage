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
            const response = await NoticeStorage.getNotices(notice);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async showOne() {
        try {
            const notice = this.body;
            const response = await NoticeStorage.getNotice(notice);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        try {
            const notice = this.body;
            const response = await NoticeStorage.update(notice);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        try {
            const notice = this.body;
            const response = await NoticeStorage.delete(notice);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Notice;