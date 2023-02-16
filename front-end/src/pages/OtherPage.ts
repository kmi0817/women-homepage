import { BaseComponent } from '../BaseComponent.js';

export class OtherPage extends BaseComponent<HTMLElement> {
    constructor(private router: any) {
        super(`<section><h1>Other Page~</h1>
        <button type="button" class="mainBtn">Go Main</button>
        </section>
        `);
        console.log("other page")
    }

    mount() {
        const button = document.querySelector(`.mainBtn`);
        button?.addEventListener('click', () => {
            this.router.push('main');
        });
    }
}