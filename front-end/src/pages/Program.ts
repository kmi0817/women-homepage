import { BaseComponent } from '../BaseComponent.js';

export class ProgramPage extends BaseComponent<HTMLElement> {
    constructor(private router: any) {
        super(`<section><h1>Program Page~</h1>
        <button type="button" class="mainBtn">Go Main</button>
        </section>
        `);
        console.log("program page")
    }

    mount() {
        const button = document.querySelector(`.mainBtn`);
        button?.addEventListener('click', () => {
            console.log('click!')
            history.pushState({ data: 'main' }, 'data!!', '/main');
        });
    }
}