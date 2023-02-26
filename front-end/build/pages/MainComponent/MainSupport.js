import { makeElement } from '../../api/api.js';
import { Modal } from './modal/Modal.js';
export class MainSupport {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.modalData = [
            {
                title: '법률지원',
                info: '그동안 빚 때문에 마음고생 많으셨죠?',
                list: ['선불금으로 인한 고소 및 고발', '민형사 소송', '파산 및 신용회복'],
                supportText: '전문적인 법률 지원으로 여러분이 탈성매매하도록 도와드립니다.',
            },
            {
                title: '의료지원',
                info: '성매매하는 동안 제대로 치료받지 못하고 지내면서 얼마나 아프셨어요?',
                list: ['치과', '문신제거', '산부인과 질환', '정신과 진료'],
                supportText: '성매매피해로 인한 정신적ㆍ신체적 질병을 치료하여 건강한 여성으로 살 수 있습니다.',
            },
            {
                title: '자활지원',
                info: '성매매를 그만두려 하여도 앞으로 어떤일을 해서 살아야할지 망설이셨죠?',
                list: ['머리ㆍ피부미용', '네일아트', '컴퓨터', '제과제빵', '한식조리사', '간호조무사'],
                supportText: '잃어버린 꿈, 하고 싶던 일,...취업을 위해 기술교육과 자격증을 취득할 기회를 여기서 함께 만들어가요!',
            },
            {
                title: '진학지원',
                info: '공부를 중단한 것에 대해 매일매일 후회하면서 지내셨나요?',
                list: ['고ㆍ대입 검정고시지원', '상급학교진학(대학)', '대안학교 진학', '대학생 자원봉사자의 개별 학습지도'],
                supportText: '이곳에서 부족한 개인학업을 도와드립니다.',
            },
            {
                title: '취미/문화관련',
                info: '사회복지 시설을 답답한 곳이라고 생각하여 입소를 망설이시나요?',
                list: ['비즈공예', '요리교실', '천연화장품 만들기', '요가', '이미지메이킹', '프레스 플라워'],
                supportText: '캠프, 영화감상, 공연관람, 레포츠 등 다양한 문화활동을 통해 삶의 여유를 나누어 웰빙 라이프를 실현합니다.',
            },
            {
                title: '정서지원사업',
                info: '마음이 아파서 지치고, 힘겨운 나날을 홀로 어떻게 견디셨나요?',
                list: ['자아성장프로그램', '리더십프로그램', '영화테라피', '미술테라피', '댄스테라피'],
                supportText: '같은 아픔을 겪은 여성들이 모여 위로와 격려로 서로 보듬어 안고, 자신감을 가지고 세상을 향해 멋지게 한걸음 내딛을 수 있도록 합니다.',
            },
        ];
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
    element(modalData) {
        const ele = makeElement('div', 'class', 'support_ele_section');
        const titleDiv = makeElement('div', 'class', 'support_ele_title');
        const titleClick = makeElement('div', 'class', 'support_ele_click');
        titleDiv.innerText = modalData.title;
        titleClick.innerText = `click!`;
        ele.addEventListener('click', () => {
            const cardModal = new Modal(ele);
        });
        ele.appendChild(titleDiv);
        ele.appendChild(titleClick);
        return ele;
    }
}
