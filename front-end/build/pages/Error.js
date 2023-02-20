import { BaseComponent } from '../BaseComponent.js';
export class ErrorPage extends BaseComponent {
    constructor() {
        super(`<section><h1>Error Page~</h1>
            <button type="button" class="mainBtn">Go Main</button>
            </section>
        `);
    }
    mount() {
        const button = document.querySelector(`.mainBtn`);
        button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
            history.pushState({ data: 'main' }, 'ErrorPage', '/main');
        });
    }
}
