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
        const section = document.createElement('section');
        section.setAttribute('class', 'newPost_section');

        const div1 = document.createElement('div');
        div1.setAttribute('class', 'newPost_title');
        div1.innerText = `새글 소식`;

        section.appendChild(div1);

        const div2 = document.createElement('div');
        div2.setAttribute('class', 'newPost_contents');

        for (let i = 0; i < Object.keys(this.data).length; i++) {
            const div = document.createElement('div');
            div.setAttribute('class', 'content_div');
            const div2Title = document.createElement('div');
            div2Title.setAttribute('class', 'newPost_postTitle');
            const pTitle = document.createElement('p');
            pTitle.innerText = `${this.data[i].title}`
            div2Title.appendChild(pTitle);

            const div2Writer = document.createElement('div');
            div2Writer.setAttribute('class', 'newPost_postEtc');
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