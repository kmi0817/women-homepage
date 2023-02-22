import { ImageSlide } from './MainComponent/ImageSlide.js';
import { MainDonation } from './MainComponent/MainDonation.js';
import { MenuButton } from './MainComponent/MenuButton.js';
import { NewNotice } from './MainComponent/NewNotice.js';
import { NewPost } from './MainComponent/NewPost.js';

export class MainPage {
    constructor(private $target: HTMLElement) {
    }

    render() {
        const imageSlide = new ImageSlide(this.$target);
        const menuButton = new MenuButton(this.$target);

        const newPost = new NewPost(this.$target);
        const newNotice = new NewNotice(this.$target);
        const mainDonation = new MainDonation(this.$target);
    }
}