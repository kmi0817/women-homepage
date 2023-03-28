"use strict";

const CounselCommentStorage = require("./CounselCommentStorage");

class CounselComment {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const comment = this.body;
        try {
            const response = await CounselCommentStorage.save(comment);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        const comment = this.body;
        try {
            const response = await CounselCommentStorage.getComments(comment.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = CounselComment;