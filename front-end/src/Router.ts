import { Component } from './BaseComponent';

type pagesType = {
    page: any,
    path: string,
}

export class Router {
    private nowPage: string = ``;

    constructor(appRoot: HTMLElement, private pages: Array<pagesType>) {
        window.onhashchange = () => {
            this.nowPage = window.location.hash.replace('#', '');

            const currentpage = this.pages.find((page) => { return page.path === this.nowPage });
            const Page = currentpage!.page;
            const renderPage = new Page(this);

            appRoot.innerHTML = ``;
            renderPage.attachTo(appRoot);
            renderPage.mount();
        };
    }

    push(pageName: string) {
        window.location.hash = pageName;
    }
}