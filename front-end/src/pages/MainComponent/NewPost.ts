import { makeElement } from '../../api/api.js';

export class NewPost {
    private data = [
        { title: '최신 글 제목입니다.', writer: '한국여성의집' },
        { title: '최신 글 제목입니다.', writer: '한국여성의집' },
        { title: '최신 글 제목입니다.!!!', writer: '한국여성의집' },
        { title: '최신 글 제목입니다. 안녕하세요?', writer: '한국여성의집' },
        { title: '최신 글 제목입니다.', writer: '한국여성의집' },
        { title: '최신 글 제목입니다.', writer: '한국여성의집' },
        { title: '최신 글 제목입니다.', writer: '한국여성의집' },
        { title: '최신 글 제목입니다.', writer: '한국여성의집' },
        { title: '최신 글 제목입니다.', writer: '한국여성의집' },
    ]
    constructor(private appRoot: HTMLElement) {
        this.render();
    }

    render() {
        const section = makeElement('section', 'class', 'newPost_section');

        const div1 = makeElement('div', 'class', 'newPost_title');
        div1.innerText = `새글 소식`;
        section.appendChild(div1);

        const div2 = makeElement('div', 'class', 'newPost_contents');

        for (let i = 0; i < Object.keys(this.data).length; i++) {
            const div = makeElement('div', 'class', 'content_div');
            const div2Title = makeElement('div', 'class', 'newPost_postTitle')

            const pTitle = document.createElement('p');
            pTitle.innerText = `${this.data[i].title}`
            div2Title.appendChild(pTitle);

            const div2Writer = makeElement('div', 'class', 'newPost_postEtc')
            const pWriter = document.createElement('p');
            pWriter.innerText = `${this.data[i].writer}`;
            div2Writer.appendChild(pWriter)

            div.appendChild(div2Title);
            div.appendChild(div2Writer);
            div2.appendChild(div);
        }
        section.appendChild(div2);
        this.appRoot.appendChild(section);
    }
}