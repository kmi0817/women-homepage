import { BaseComponent } from '../BaseComponent.js';
export class OtherPage extends BaseComponent {
    constructor(router) {
        super(`<section><h1>Other Page~</h1>
        <button type="button" class="mainBtn">Go Main</button>
        </section>
        `);
        this.router = router;
        console.log("other page");
    }
    mount() {
        const button = document.querySelector(`.mainBtn`);
        button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
            this.router.push('main');
        });
    }
}
