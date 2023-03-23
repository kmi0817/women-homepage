import { makeElement } from '../api/api.js';
export class Sostt {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }
    render() {
        const title = makeElement('div', 'class', 'history_title');
        title.innerText = `소소뜨라`;
        this.appRoot.appendChild(title);
    }
}
