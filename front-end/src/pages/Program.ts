import { BaseComponent } from '../BaseComponent.js';

export class ProgramPage {
    constructor(private $target: HTMLElement) {
        console.log("program page")
    }

    render() {
        const h1 = document.createElement('h1');
        h1.innerText = `Program Page~`;
        const button = document.createElement('button');
        button.setAttribute('class', 'moveBtn');
        button.innerText = `Go Main`;
        button.addEventListener('click', () => {
            history.pushState({ data: 'main' }, 'data!!', '/');
        });

        this.$target.appendChild(h1);
        this.$target.appendChild(button);
    }
}