import { makeElement } from '../../api/api.js';

type supportDataType = {
    title: string,
    info: string,
    list: Array<string>,
    supportText: string,
}

export class MainSupport {
    private modalData: Array<supportDataType> = [
        {
            title: '법률지원',
            info: '그동안 빚 때문에 마음고생 많으셨죠?',
            list: ['선불금으로 인한 고소 및 고발', '민형사 소송', '파산 및 신용회복'],
            supportText: '전문적인 법률 지원으로 여러분이 탈성매매하도록 도와드립니다.',
        },
        {
            title: '의료지원',
            info: '그동안 빚 때문에 마음고생 많으셨죠?',
            list: ['선불금으로 인한 고소 및 고발', '민형사 소송', '파산 및 신용회복'],
            supportText: '전문적인 법률 지원으로 여러분이 탈성매매하도록 도와드립니다.',
        },
        {
            title: '자활지원',
            info: '그동안 빚 때문에 마음고생 많으셨죠?',
            list: ['선불금으로 인한 고소 및 고발', '민형사 소송', '파산 및 신용회복'],
            supportText: '전문적인 법률 지원으로 여러분이 탈성매매하도록 도와드립니다.',
        },
        {
            title: '진학지원',
            info: '그동안 빚 때문에 마음고생 많으셨죠?',
            list: ['선불금으로 인한 고소 및 고발', '민형사 소송', '파산 및 신용회복'],
            supportText: '전문적인 법률 지원으로 여러분이 탈성매매하도록 도와드립니다.',
        },
        {
            title: '취미/문화관련',
            info: '그동안 빚 때문에 마음고생 많으셨죠?',
            list: ['선불금으로 인한 고소 및 고발', '민형사 소송', '파산 및 신용회복'],
            supportText: '전문적인 법률 지원으로 여러분이 탈성매매하도록 도와드립니다.',
        },
        {
            title: '정서지원사업',
            info: '그동안 빚 때문에 마음고생 많으셨죠?',
            list: ['선불금으로 인한 고소 및 고발', '민형사 소송', '파산 및 신용회복'],
            supportText: '전문적인 법률 지원으로 여러분이 탈성매매하도록 도와드립니다.',
        },
    ]

    constructor(private appRoot: HTMLElement) {
        this.render();
    }

    render() {
        const title_section = makeElement('div', 'class', 'support_title_section');
        const title_title = makeElement('p', 'class', 'support_title');
        title_title.innerText = `지원사업`;
        title_section.appendChild(title_title);
        const title_title_desc = makeElement('p', 'class', 'support_title desc');
        title_title_desc.innerText = `한국여성의집에서 지원하는 다양한 사업`;
        title_section.appendChild(title_title_desc);
        this.appRoot.appendChild(title_section);

        const title_desc = makeElement('div', 'class', 'support_desc');
        for (let val of this.modalData) {
            const ele = this.element(val);
            title_desc.appendChild(ele);
        }
        this.appRoot.appendChild(title_desc);

        const bottom = makeElement('div', 'class', 'support_bottom');
        bottom.innerText = `사업의 자세한 내용을 확인하려면 해당 영역을 클릭해주세요.`;
        this.appRoot.appendChild(bottom);
    }

    element(modalData: supportDataType) {
        const ele = makeElement('div', 'class', 'support_ele_section');
        const titleDiv = makeElement('div', 'class', 'support_ele_title');
        const titleClick = makeElement('div', 'class', 'support_ele_click');
        titleDiv.innerText = modalData.title;
        titleClick.innerText = `click!`;

        ele.addEventListener('click', () => {
            this.createModal(modalData);
        });
        ele.appendChild(titleDiv);
        ele.appendChild(titleClick);
        return ele;
    }

    createModal(modalData: supportDataType) {
        alert('modal!');
    }
}