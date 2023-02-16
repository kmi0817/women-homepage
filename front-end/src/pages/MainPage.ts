import { BaseComponent } from '../BaseComponent.js';

export class MainPage extends BaseComponent<HTMLElement> {
    constructor(private router: any) {
        super(`<section><h1>Main Page~</h1>
            <button type="button" class="otherBtn">Go Other</button>
            </section>
        `);
        console.log("main page")
    }

    mount() {
        const button = document.querySelector(`.otherBtn`);
        button?.addEventListener('click', () => {
            this.router.push('other');
        });
    }
}