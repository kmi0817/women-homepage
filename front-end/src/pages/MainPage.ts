import { BaseComponent } from '../BaseComponent.js';
export class MainPage extends BaseComponent<HTMLElement> {
    constructor() {
        super(`<section><h1>Main Page~</h1>
            <button type="button" class="moveBtn">Go Other</button>
            </section>
        `);
    }

    mount() {
        const button = document.querySelector(`.moveBtn`);
        button?.addEventListener('click', () => {
            console.log('click!')
            history.pushState({ data: 'other' }, 'data!!', '/other');
        });
    }
}