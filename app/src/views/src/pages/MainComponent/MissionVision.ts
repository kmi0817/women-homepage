import { makeElement } from '../../api/api.js';

export class MissionVision {
    constructor(private appRoot: HTMLElement) {
        this.render();
    }

    render() {
        const title = makeElement('div', 'class', 'mission_title');
        title.innerText = `미션과 비전`;

        const description = makeElement('div', 'class', 'mission_desc');
        const div1 = makeElement('div', 'class', 'mission_desc1');
        const div1span1 = makeElement('span', 'class', 'mission_span1');
        div1span1.innerText = `미션`
        const div1span2 = makeElement('span', 'class', 'mission_span2');
        div1span2.innerText = `본래적인 자신의 존재의미를 발견하고 자기존엄과 상호존엄을 실천하는 삶`
        div1.appendChild(div1span1);
        div1.appendChild(div1span2);

        const div2 = makeElement('div', 'class', 'mission_desc2');
        const div2span1 = makeElement('span', 'class', 'mission_span1');
        div2span1.innerText = `비전`;
        const div2span2 = makeElement('span', 'class', 'mission_span2');
        div2span2.innerText = ` 삶의 다양성을 있는 그대로 존중한다.
                                존엄에 기반하여 건강하고 분명하게 소통한다.
                                자율성을 가지고 책임있게 행동한다.
                              `;
        div2.appendChild(div2span1);
        div2.appendChild(div2span2);
        description.appendChild(div1);
        description.appendChild(div2);

        this.appRoot.appendChild(title);
        this.appRoot.appendChild(description);
    }
}