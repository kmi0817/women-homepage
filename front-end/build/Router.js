import { MainPage } from './/pages/MainPage.js';
import { ProgramPage } from './pages/Program.js';
import { ErrorPage } from './pages/Error.js';
export class Router {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.pages = [
            { page: MainPage, path: '' },
            { page: ProgramPage, path: 'other' },
        ];
        this.nowPage = ``;
        window.addEventListener('click', (e) => {
            e.preventDefault();
            this.test();
        });
        window.addEventListener('load', (e) => {
            e.preventDefault();
            this.test();
        });
    }
    test() {
        const currentpage = this.pages.find((page) => { return page.path === window.location.pathname.replace('/', ''); });
        if (currentpage === undefined) {
            this.appRoot.innerHTML = ``;
            const error = new ErrorPage();
            error.attachTo(this.appRoot);
            error.mount();
        }
        else {
            const Page = currentpage.page;
            const renderPage = new Page(this.appRoot);
            this.appRoot.innerHTML = ``;
            renderPage.render();
        }
    }
    push(pageName) {
        window.location.hash = pageName;
    }
}
