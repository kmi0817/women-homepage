import { ImageSlide } from './MainComponent/ImageSlide.js';
import { makeElement } from '../api/api.js';
export class ProgramPage {
    constructor($target) {
        this.$target = $target;
    }
    render() {
        const title = makeElement('div', 'class', 'history_title');
        const title_title = makeElement('p', 'class', 'history_title_title');
        title_title.innerText = `프로그램 안내`;
        const title_desc = makeElement('p', 'class', 'history_title_desc');
        title_desc.innerText = `프로그램 흐름 및 소개`;
        title.appendChild(title_title);
        title.appendChild(title_desc);
        const desc = makeElement('div', 'class', 'program_desc');
        this.$target.appendChild(title);
        const imageSlide = new ImageSlide(desc);
        this.$target.appendChild(desc);
    }
}
