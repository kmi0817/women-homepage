import { makeElement } from '../../api/api.js';
export class Value {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.render();
    }
    render() {
        const title = makeElement('div', 'class', 'value_title');
        title.innerText = `핵심가치`;
        this.appRoot.appendChild(title);
        const description = makeElement('div', 'class', 'value_desc');
        const circle1 = makeElement('div', 'class', 'value_circle');
        const circle1title = makeElement('div', 'class', 'value_desc_title');
        circle1title.innerText = `존중`;
        const circle1desc = makeElement('span', 'class', 'value_desc_desc');
        circle1desc.innerText = `이용자를 있는 
        그대로의 모습으로 
        존중한다.`;
        circle1.appendChild(circle1title);
        circle1.appendChild(circle1desc);
        const circle2 = makeElement('div', 'class', 'value_circle');
        const circle2title = makeElement('div', 'class', 'value_desc_title');
        circle2title.innerText = `기다림`;
        const circle2desc = makeElement('span', 'class', 'value_desc_desc');
        circle2desc.innerText = `이용자가 자신의
        잠재력을 찾을 때까지
        신뢰하고 기다린다.`;
        circle2.appendChild(circle2title);
        circle2.appendChild(circle2desc);
        const circle3 = makeElement('div', 'class', 'value_circle');
        const circle3title = makeElement('div', 'class', 'value_desc_title');
        circle3title.innerText = `상생`;
        const circle3desc = makeElement('span', 'class', 'value_desc_desc');
        circle3desc.innerText = `직원과 이용자가
        공동체 생활을 통해
       함께 성장한다.`;
        circle3.appendChild(circle3title);
        circle3.appendChild(circle3desc);
        description.appendChild(circle1);
        description.appendChild(circle2);
        description.appendChild(circle3);
        this.appRoot.appendChild(description);
    }
}
