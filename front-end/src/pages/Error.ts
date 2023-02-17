import { BaseComponent } from '../BaseComponent.js';

export class ErrorPage extends BaseComponent<HTMLElement> {
    constructor() {
        super(`<section><h1>Error Page~</h1>
            <button type="button" class="otherBtn">Go Other</button>
            </section>
        `);
    }

    mount() {
        const button = document.querySelector(`.otherBtn`);
        button?.addEventListener('click', () => {
            history.pushState({ data: 'main' }, 'ErrorPage', '/main');
        });
    }
}