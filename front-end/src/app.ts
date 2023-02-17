import { Header } from './etc/Header.js';
import { MainPage } from './pages/MainPage.js';
import { ProgramPage } from './pages/Program.js';
import { ErrorPage } from './pages/Error.js';
import { Router } from './Router.js';

class App {
    private pages = [
        { page: MainPage, path: 'main' },
        { page: ProgramPage, path: 'other' },
    ];

    constructor(appRoot: HTMLElement) {
        try {
            const header = new Header();
            header.attachTo(appRoot);
            const mainPage = new MainPage();
            mainPage.attachTo(appRoot.querySelector('.main') as HTMLElement);
            mainPage.mount();
            const router = new Router(appRoot.querySelector(`.main`) as HTMLElement);
        }
        catch {
            const error = new ErrorPage();
        }
    }
}

new App(document.querySelector('.app')! as HTMLElement);