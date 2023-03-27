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
            if (notice.hasOwnProperty("category")) {
                if (notice.category === "title") { // Search by title
                    const response = await NoticeStorage.getNoticesByTitle(notice);
                    return response;
                } else if (notice.category === "writer") {// Search by writer
                    const response = await NoticeStorage.getNoticesByWriter(notice);
                    return response;
                } else if (notice.category === "description") { // Search by description
                    const response = await NoticeStorage.getNoticesByDesc(notice);
                    return response;
                }
            }
            
            // No search filter
            const response = await NoticeStorage.getNotices(notice.startNo);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async showOne() {
        const notice = this.body;
        try {
            const data = await NoticeStorage.getNotice(notice.id);
            if (!data.id) // check if posting for this id exist
                return { success: false, msg: `Posting for this id doesn't exist` };
            return { success: true, data: data}
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        const notice = this.body;
        try {
            const { id } = await NoticeStorage.getNotice(notice.id); // get id
            if (!id) // check if postig for this id exist
                return { success: false, msg: "Posting for this id doesn't exist"}
            const response = await NoticeStorage.update(notice);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        const notice = this.body;
        try {
            const { id } = await NoticeStorage.getNotice(notice.id); // get id
            if (!id) // check if postig for this id exist
                return { success: false, msg: "Posting for this id doesn't exist"}
            const response = await NoticeStorage.delete(notice.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Notice;