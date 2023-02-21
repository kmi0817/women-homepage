import { ImageSlide } from './MainComponent/ImageSlide.js';
import { MenuButton } from './MainComponent/MenuButton.js';
export class MainPage {
    constructor($target) {
        this.$target = $target;
    }
    render() {
        // const h1 = document.createElement('h1');
        // h1.innerText = `Main Page ~`;
        // const button = document.createElement('button');
        // button.setAttribute('class', 'moveBtn');
        // button.innerText = `Go Other`;
        // button.addEventListener('click', () => {
        //     history.pushState('', '', '/program');
        // });
        // this.$target.appendChild(h1);
        // this.$target.appendChild(button);
        const imageSlide = new ImageSlide(this.$target);
        const menuButton = new MenuButton(this.$target);
    }
}
