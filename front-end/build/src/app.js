"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Header_js_1 = require("./etc/Header.js");
class App {
    constructor(appRoot) {
        console.log(`Hello, It's App!!!`);
        const header = new Header_js_1.Header();
        console.log(header);
        header.attachTo(appRoot);
    }
}
new App(document.querySelector('.app'));
