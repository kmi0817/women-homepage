import { Header } from './etc/Header.js';
import { MainPage } from './pages/MainPage.js';
import { OtherPage } from './pages/OtherPage.js';
import { Router } from './Router.js';
class App {
    constructor(appRoot) {
        this.pages = [
            { page: MainPage, path: 'main' },
            { page: OtherPage, path: 'other' },
        ];
        const header = new Header();
        header.attachTo(appRoot.querySelector(`.header`));
        const router = new Router(appRoot.querySelector(`.main`), this.pages);
        console.log(router);
    }
}
new App(document.querySelector('.app'));
