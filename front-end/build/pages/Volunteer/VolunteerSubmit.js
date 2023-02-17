import { BaseComponent } from '../../BaseComponent.js';
export class VolunteerSubmit extends BaseComponent {
    constructor(router) {
        super(`<section><h1>Volunteer Sumbit Page~</h1>
            <button type="button" class="otherBtn">Go Other</button>
            </section>
        `);
        this.router = router;
    }
    mount() {
        const button = document.querySelector(`.otherBtn`);
        button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
            this.router.push('other');
        });
    }
}
