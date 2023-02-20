import { BaseComponent } from '../../BaseComponent.js';

export class VolunteerSubmit extends BaseComponent<HTMLElement> {
    constructor() {
        super(`<section><h1>Volunteer Sumbit Page~</h1>
            <button type="button" class="otherBtn">Go Other</button>
            </section>
        `);
    }

    mount() {
    }
}