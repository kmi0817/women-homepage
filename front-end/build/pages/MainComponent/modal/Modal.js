import { makeElement } from '../../../api/api.js';
export class Modal {
    constructor(parent, modalData) {
        this.parent = parent;
        this.modalData = modalData;
        this.render();
    }
    render() {
        const modalBackground = makeElement('div', 'class', 'modal_background');
        modalBackground.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            this.removeElement(modalBackground);
        });
        const modalDiv = makeElement('div', 'class', 'modal_div');
        modalDiv.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
        });
        const modalHeader = makeElement('div', 'class', 'modal_header');
        const buttonDiv = makeElement('div', 'class', 'button_div');
        const xButton = makeElement('button', 'class', 'modal_close');
        xButton.innerText = `닫기 X`;
        xButton.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            this.removeElement(modalBackground);
        });
        buttonDiv.appendChild(xButton);
        const modalHeaderText = makeElement('div', 'class', 'modal_header_text');
        const modalHeaderTitle = makeElement('span', 'class', 'modal_header_title');
        modalHeaderTitle.innerText = this.modalData.title;
        const modalHeaderDesc = makeElement('span', 'class', 'modal_header_desc');
        modalHeaderDesc.innerText = this.modalData.info;
        modalHeaderText.appendChild(modalHeaderTitle);
        modalHeaderText.appendChild(modalHeaderDesc);
        modalHeader.appendChild(buttonDiv);
        modalHeader.appendChild(modalHeaderText);
        const modalBody = makeElement('div', 'class', 'modal_body');
        const modalBodyUl = makeElement('ul', 'class', 'modal_body_ul');
        for (let i = 0; i < this.modalData.list.length; i++) {
            const modalBodyLi = makeElement('li', 'class', 'modal_body_li');
            modalBodyLi.innerText = this.modalData.list[i];
            modalBodyUl.appendChild(modalBodyLi);
        }
        modalBody.appendChild(modalBodyUl);
        const modalBodybottom = makeElement('div', 'class', 'modal_body_bottom');
        modalBodybottom.innerText = this.modalData.supportText;
        modalBody.appendChild(modalBodybottom);
        modalDiv.appendChild(modalHeader);
        modalDiv.appendChild(modalBody);
        modalBackground.appendChild(modalDiv);
        this.parent.appendChild(modalBackground);
    }
    removeElement(modalDiv) {
        this.parent.removeChild(modalDiv);
    }
}
