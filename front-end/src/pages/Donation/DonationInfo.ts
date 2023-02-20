import { BaseComponent } from '../../BaseComponent.js';

export class DonationInfo extends BaseComponent<HTMLElement> {
    constructor() {
        super(`<section><h1>Donation Information Page~</h1>
            <button type="button" class="otherBtn">Go Other</button>
            </section>
        `);
    }

    mount() {
    }
}