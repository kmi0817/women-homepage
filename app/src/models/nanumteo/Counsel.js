"use strict";

const bcrypt = require("bcrypt");
const CounselStorage = require("./CounselStorage");

class Counsel {
    constructor(body) {
        this.body = body
    }

    async register() {
        const counsel = this.body;
        try {
            const response = await CounselStorage.save(counsel);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        const counsel = this.body;
        try {
            const response = await CounselStorage.getCounsels(counsel);
            return response;
        } catch (err) {
            return { success: false, err};
        }
    }

    async showOne() {
        const verified = await this.verify(); // verify 
        
        if (!verified.success)
            return verified;

        const counsel = this.body;
        try {
            const data = await CounselStorage.getCounsel(counsel.id);
            delete data.password; // delete password from data object
            return { success: true, data: data };
        } catch (err) {
            return { success: false, err };
        }
    }

    async verify() {
        const counsel = this.body;
        try {
            const { password } = await CounselStorage.getCounsel(counsel.id);
            if (await bcrypt.compare(counsel.password, password)) {
                // use bcrypt to hash the password and compared it to stored hash
                return { success: true };
            }
            return { success: false, err: "Password doesn't match" };
        } catch (err) {
            return { success: false, err: `${err}` }; // key와 value가 같으면 key만 입력해도 된다.
        }
    }
}

module.exports = Counsel;