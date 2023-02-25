import { makeElement } from '../../api/api.js';

export class MainInfo {
    private textData = [
        { title: '지원 프로그램', desc: '탈성매매 지원, 법률 지원, 의료 지원, 창업지원' },
        { title: '상담 프로그램', desc: '전문심리상담, 심리 검사, 집단상담' },
        { title: '성장을 위한 프로그램', desc: '참된 만남과 성장을 위한 문화예술치유, 교육, 생활 지도' },
        { title: '취미 프로그램', desc: '여유로운 생활을 위한 취미 활동' },
    ]
    constructor(private appRoot: HTMLElement) {
        this.render();
    }

    render() {
        const title_section = makeElement('section', 'class', 'info_title_section');
        const title_title = makeElement('p', 'class', 'info_title');
        title_title.innerText = `한국여성의집 소개`;
        const title_desc = makeElement('p', 'class', 'info_title desc');
        title_desc.innerText = `탈성매매여성과 함께 어제의 아픔을 한 움큼 비우고 오늘의 땀으로 꿈을 빚어 내일의 희망을 나누고자 합니다.`;
        title_section.appendChild(title_title);
        title_section.appendChild(title_desc);

        const desc_section = makeElement('section', 'class', 'info_desc_section');
        for (let val of this.textData) {
            const ele = this.element(val.title, val.desc);
            desc_section.appendChild(ele);
        }

        this.appRoot.appendChild(title_section);
        this.appRoot.appendChild(desc_section);
    }

    element(title: string, desc: string) {
        const div = makeElement('div', 'class', 'info_ele_div');
        const titleDiv = makeElement('div', 'class', 'info_ele_title');
        const descDiv = makeElement('div', 'class', 'info_ele_desc');

        titleDiv.innerText = title;
        descDiv.innerText = desc;
        div.appendChild(titleDiv);
        div.appendChild(descDiv);
        return div;
    }
}