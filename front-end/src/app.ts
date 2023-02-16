import { Header } from './etc/Header.js';
import { MainPage } from './pages/MainPage.js';
import { OtherPage } from './pages/OtherPage.js';
import { Router } from './Router.js';

class App {
    private pages = [
        { page: MainPage, path: 'main' },
        { page: OtherPage, path: 'other' },
    ];

    constructor(appRoot: HTMLElement) {
        const header = new Header();
        header.attachTo(appRoot.querySelector(`.header`) as HTMLElement);
        const router = new Router(appRoot.querySelector(`.main`) as HTMLElement, this.pages);
        console.log(router)
    }
}

new App(document.querySelector('.app')! as HTMLElement);