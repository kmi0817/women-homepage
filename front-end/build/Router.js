import { MainPage } from './/pages/MainPage.js';
import { ProgramPage } from './pages/Program.js';
export class Router {
    constructor(appRoot) {
        this.pages = [
            { page: MainPage, path: 'main' },
            { page: ProgramPage, path: 'other' },
        ];
        this.nowPage = ``;
        window.addEventListener('click', () => {
            console.log(window.history.state);
            const currentpage = this.pages.find((page) => { return page.path === window.history.state.data; });
            const Page = currentpage.page;
            const renderPage = new Page(this);
            appRoot.innerHTML = ``;
            renderPage.attachTo(appRoot);
            renderPage.mount();
        });
    }
    push(pageName) {
        window.location.hash = pageName;
    }
}
