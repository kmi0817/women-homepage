import { Header } from './etc/Header.js';
import { Router } from './Router.js';

class App {
    constructor(appRoot: HTMLElement) {
        const header = new Header();
        header.attachTo(appRoot);
        const router = new Router(appRoot.querySelector(`.main`) as HTMLElement);
    }
}

new App(document.querySelector('.app')! as HTMLElement);