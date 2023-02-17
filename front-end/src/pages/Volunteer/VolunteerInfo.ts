import { BaseComponent } from '../../BaseComponent.js';

export class VolunteerInfo extends BaseComponent<HTMLElement> {
    constructor(private router: any) {
        super(`<section><h1>Volunteer Information Page~</h1>
            <button type="button" class="otherBtn">Go Other</button>
            </section>
        `);
    }

    mount() {
        const button = document.querySelector(`.otherBtn`);
        button?.addEventListener('click', () => {
            this.router.push('other');
        });
    }
}