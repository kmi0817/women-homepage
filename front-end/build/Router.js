export class Router {
    constructor(appRoot, pages) {
        this.pages = pages;
        this.nowPage = ``;
        window.onhashchange = () => {
            this.nowPage = window.location.hash.replace('#', '');
            const currentpage = this.pages.find((page) => { return page.path === this.nowPage; });
            const Page = currentpage.page;
            const renderPage = new Page(this);
            appRoot.innerHTML = ``;
            renderPage.attachTo(appRoot);
            renderPage.mount();
        };
    }
    push(pageName) {
        window.location.hash = pageName;
    }
}
