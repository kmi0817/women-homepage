import { Header } from './etc/Header.js';
import { Router } from './Router.js';
class App {
    constructor(appRoot) {
        const header = new Header();
        header.attachTo(appRoot);
        const router = new Router(appRoot.querySelector(`.main`));
    }
}
new App(document.querySelector('.app'));
