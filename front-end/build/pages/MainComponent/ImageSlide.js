export class ImageSlide {
    constructor($target) {
        this.$target = $target;
        this.currentSlide = 0;
        this.render();
    }
    render() {
        const element = document.createElement('div');
        element.setAttribute('class', 'slider_wrap');
        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('img');
            if (i === 1) {
                img.setAttribute('class', `slide_item item${i} active`);
            }
            else {
                img.setAttribute('class', `slide_item item${i}`);
            }
            img.setAttribute('src', `https://www.picsum.photos/500/300`);
            img.setAttribute('alt', `한국여성의집 이미지 ${i}`);
            element.appendChild(img);
        }
        const buttonDiv = document.createElement('div');
        buttonDiv.setAttribute('class', 'buttonDiv');
        const prev = document.createElement('div');
        prev.setAttribute('class', 'slide_button slide_prev_button');
        prev.innerText = `◀`;
        const next = document.createElement('div');
        next.setAttribute('class', 'slide_button slide_next_button');
        next.innerText = `▶`;
        const pagination = document.createElement('ul');
        pagination.setAttribute('class', 'slide_pagination');
        buttonDiv.appendChild(prev);
        buttonDiv.appendChild(next);
        element.appendChild(buttonDiv);
        element.appendChild(pagination);
        this.$target.appendChild(element);
        const startSlide = 0;
        const slideItems = document.querySelectorAll('.slide_item');
        const endSlide = slideItems.length - 1;
        for (let i = 0; i <= endSlide; i++) {
            if (i === 0) {
                pagination.innerHTML += `<li class="pagination_button active">•</li>`;
            }
            else {
                pagination.innerHTML += `<li class="pagination_button">•</li>`;
            }
        }
        const paginationItems = document.querySelectorAll('.slide_pagination > li');
        prev.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            if (this.currentSlide > startSlide) {
                this.currentSlide--;
            }
            else {
                this.currentSlide = endSlide;
            }
            this.changeSlider(slideItems, paginationItems, element.clientWidth);
        });
        next.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            if (this.currentSlide < endSlide) {
                this.currentSlide++;
            }
            else {
                this.currentSlide = 0;
            }
            this.changeSlider(slideItems, paginationItems, element.clientWidth);
        });
        const pagination_button = document.querySelectorAll('.pagination_button');
        pagination_button.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                this.currentSlide = index;
                this.changeSlider(slideItems, paginationItems, element.clientWidth);
            });
        });
    }
    changeSlider(slideItems, paginationItems, slideWidth) {
        slideItems.forEach((item) => item.classList.remove("active"));
        slideItems[this.currentSlide].classList.add('active');
        paginationItems.forEach((item) => item.classList.remove("active"));
        paginationItems[this.currentSlide].classList.add('active');
    }
}
