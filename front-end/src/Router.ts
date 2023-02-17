import { Component } from './BaseComponent';
import { MainPage } from './/pages/MainPage.js';
import { ProgramPage } from './pages/Program.js';

type pagesType = {
    page: any,
    path: string,
}

export class Router {
    private pages = [
        { page: MainPage, path: 'main' },
        { page: ProgramPage, path: 'other' },
    ];
    private nowPage: string = ``;

    constructor(appRoot: HTMLElement) {
        window.addEventListener('click', () => {
            console.log(window.history.state)
            const currentpage = this.pages.find((page) => { return page.path === window.history.state.data });
            const Page = currentpage!.page;
            const renderPage = new Page(this);
            appRoot.innerHTML = ``;
            renderPage.attachTo(appRoot);
            renderPage.mount();
        });
    }

    push(pageName: string) {
        window.location.hash = pageName;
    }
}