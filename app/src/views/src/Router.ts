import { MainPage } from './/pages/MainPage.js';
import { ProgramPage } from './pages/Program.js';
import { ErrorPage } from './pages/Error.js';
import { Sostt } from './pages/Sostt.js';

type pagesType = {
    page: any,
    path: string,
}

export class Router {
    private pages = [
        { page: MainPage, path: '' },
        { page: ProgramPage, path: 'program' },
        { page: Sostt, path: 'sostt' },
    ];
    private nowPage: string = ``;

    constructor(private appRoot: HTMLElement) {
        window.addEventListener('hrefchange', (e) => {
            e.preventDefault();
            this.test();
        });
        window.addEventListener('load', (e) => {
            e.preventDefault();
            this.test();
        })
    }

    test() {
        const currentpage = this.pages.find((page) => { return page.path === window.location.pathname.replace('/', '') });
        if (currentpage === undefined) {
            this.appRoot.innerHTML = ``;
            const error = new ErrorPage();
            error.attachTo(this.appRoot);
            error.mount();
        } else {
            const Page = currentpage!.page;
            const renderPage = new Page(this.appRoot);
            this.appRoot.innerHTML = ``;
            renderPage.render();
        }
    }

    push(pageName: string) {
        window.location.hash = pageName;
    }
}