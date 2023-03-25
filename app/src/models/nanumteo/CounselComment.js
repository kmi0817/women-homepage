"use strict";

const CounselCommentStorage = require("./CounselCommentStorage");

class CounselComment {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const cmnt = this.body;
        try {
            const response = await CounselCommentStorage.save(cmnt);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        const cmnt = this.body;
        try {
            const response = await CounselCommentStorage.getComments(cmnt.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = CounselComment;