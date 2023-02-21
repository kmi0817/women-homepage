export class MenuButton {
    constructor(private $target: HTMLElement) {
        this.render();
    }

    render() {
        const section = document.createElement('section');
        section.setAttribute('class', 'quick_section')
        const title = document.createElement('div');
        title.setAttribute('class', 'quick_title');
        title.innerHTML = `
            <h3 class="quick_title_text">QUICK</h3>
            <h3 class="quick_title_text menu">MENU</h3>
        `
        const quickMenus = document.createElement('div');
        quickMenus.setAttribute('class', 'quick_menus');

        const div1 = document.createElement('div');
        div1.setAttribute('class', 'div1');
        const div1Div1 = document.createElement('div');
        div1Div1.setAttribute('class', 'div1Div1');
        const div1Div2 = document.createElement('div');
        div1Div2.setAttribute('class', 'div1Div2');

        div1.appendChild(div1Div1);
        div1.appendChild(div1Div2);

        const div2 = document.createElement('div');
        div2.setAttribute('class', 'div2');
        const div2Div1 = document.createElement('div');
        div2Div1.setAttribute('class', 'div2Div1');
        const div2Div2 = document.createElement('div');
        div2Div2.setAttribute('class', 'div2Div2');
        const div2Div3 = document.createElement('div');
        div2Div3.setAttribute('class', 'div2Div3');

        div2.appendChild(div2Div1);
        div2.appendChild(div2Div2);
        div2.appendChild(div2Div3);

        const div3 = document.createElement('div');
        div3.setAttribute('class', 'div3');
        const div3Div1 = document.createElement('div');
        div3Div1.setAttribute('class', 'div3Div1');
        const div3Div2 = document.createElement('div');
        div3Div2.setAttribute('class', 'div3Div2');
        const div3Div3 = document.createElement('div');
        div3Div3.setAttribute('class', 'div3Div3');

        div3.appendChild(div3Div1);
        div3.appendChild(div3Div2);
        div3.appendChild(div3Div3);

        quickMenus.appendChild(div1);
        quickMenus.appendChild(div2);
        quickMenus.appendChild(div3);

        section.appendChild(title);
        section.appendChild(quickMenus);

        this.$target.appendChild(section);
    }
}