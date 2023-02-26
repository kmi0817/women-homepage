import { makeElement } from '../../../api/api.js';

export class Modal {
    constructor(private parent: HTMLElement) {
        this.render();
    }

    render() {
        console.log('modal! ' + this.parent);
        const modalDiv = makeElement('div', 'class', 'modal_div');
        modalDiv.innerText = 'modal';
        this.parent.appendChild(modalDiv);
    }

    removeElement(modalDiv: HTMLDivElement) {
        this.parent.removeChild(modalDiv);
    }
}