import { BaseComponent } from '../BaseComponent.js';
export class MainPage extends BaseComponent {
    constructor() {
        super(`<section><h1>Main Page~</h1>
            <button type="button" class="moveBtn">Go Other</button>
            </section>
        `);
    }
    mount() {
        const button = document.querySelector(`.moveBtn`);
        button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
            console.log('click!');
            history.pushState({ data: 'other' }, 'data!!', '/other');
        });
    }
}
