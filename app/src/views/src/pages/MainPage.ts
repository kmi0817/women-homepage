import { ImageSlide } from './MainComponent/ImageSlide.js';
import { MainDonation } from './MainComponent/MainDonation.js';
import { MenuButton } from './MainComponent/MenuButton.js';
import { MissionVision } from './MainComponent/MissionVision.js';
import { NewNotice } from './MainComponent/NewNotice.js';
import { NewPost } from './MainComponent/NewPost.js';
import { Value } from './MainComponent/Value.js';
import { MainInfo } from './MainComponent/MainInfo.js';
import { MainHistory } from './MainComponent/MainHistory.js';
import { MainSupport } from './MainComponent/MainSupport.js';

import { makeElement } from '../api/api.js';



export class MainPage {
    constructor(private $target: HTMLElement) {
    }

    render() {
        // main_section
        const main_section = makeElement('section', 'class', 'main_section')
        this.$target.appendChild(main_section);

        const main_section_first = makeElement('div', 'class', 'main_section_first')
        const main_section_second = makeElement('div', 'class', 'main_section_second');
        main_section.appendChild(main_section_first);
        main_section.appendChild(main_section_second);

        const imageSlide = new ImageSlide(main_section_first);
        const menuButton = new MenuButton(main_section_first);
        const newPost = new NewPost(main_section_second);
        const newNotice = new NewNotice(main_section_second);
        const mainDonation = new MainDonation(main_section_second);

        // mission_section
        const mission_section = makeElement('section', 'class', 'mission_section');
        this.$target.appendChild(mission_section);
        const missionVision = new MissionVision(mission_section);

        // value_section
        const value_section = makeElement('section', 'class', 'value_section');
        this.$target.appendChild(value_section);
        const value = new Value(value_section);

        // info_section
        const info_section = makeElement('section', 'class', 'info_section');
        this.$target.appendChild(info_section);
        const info = new MainInfo(info_section);

        // support_section
        const support_section = makeElement('section', 'class', 'support_section');
        this.$target.appendChild(support_section);
        const support = new MainSupport(support_section);

        // history_section
        const history_section = makeElement('section', 'class', 'history_section');
        this.$target.appendChild(history_section);
        const hisotry = new MainHistory(history_section);
    }
}