import { BaseComponent } from '../BaseComponent.js';
export class ProgramPage extends BaseComponent {
    constructor(router) {
        super(`<section><h1>Program Page~</h1>
        <button type="button" class="mainBtn">Go Main</button>
        </section>
        `);
        this.router = router;
        console.log("program page");
    }
    mount() {
        const button = document.querySelector(`.mainBtn`);
        button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
            console.log('click!');
            history.pushState({ data: 'main' }, 'data!!', '/main');
        });
    }
}
