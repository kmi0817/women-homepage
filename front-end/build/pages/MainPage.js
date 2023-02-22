import { ImageSlide } from './MainComponent/ImageSlide.js';
import { MainDonation } from './MainComponent/MainDonation.js';
import { MenuButton } from './MainComponent/MenuButton.js';
import { MissionVision } from './MainComponent/MissionVision.js';
import { NewNotice } from './MainComponent/NewNotice.js';
import { NewPost } from './MainComponent/NewPost.js';
export class MainPage {
    constructor($target) {
        this.$target = $target;
    }
    render() {
        // main_section
        const main_section = document.createElement('section');
        main_section.setAttribute('class', 'main_section');
        this.$target.appendChild(main_section);
        const main_section_first = document.createElement('div');
        main_section_first.setAttribute('class', 'main_section_first');
        const main_section_second = document.createElement('div');
        main_section_second.setAttribute('class', 'main_section_second');
        main_section.appendChild(main_section_first);
        main_section.appendChild(main_section_second);
        const imageSlide = new ImageSlide(main_section_first);
        const menuButton = new MenuButton(main_section_first);
        const newPost = new NewPost(main_section_second);
        const newNotice = new NewNotice(main_section_second);
        const mainDonation = new MainDonation(main_section_second);
        // mission_section
        const mission_section = document.createElement('section');
        mission_section.setAttribute('class', 'mission_section');
        this.$target.appendChild(mission_section);
        const missionVision = new MissionVision(mission_section);
        // value_section
        // info_section
        // support_section
        // history_section
    }
}
