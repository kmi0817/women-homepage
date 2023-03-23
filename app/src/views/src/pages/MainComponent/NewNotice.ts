export class NewNotice {
    private data = [
        { title: '2021년 소소뜨라 결산 및 후원금품 내역 공지', date: '2022.06.27' },
        { title: '한국여성의집 사회복지사(정규직) 채용 연장공고', date: '2022.06.27' },
        { title: '** 2022년 경제교육 **', date: '2022.06.27' },
        { title: '2022년 05-06월 소식지입니다.', date: '2022.06.27' },
        { title: '2022년 5월 기관운영비 집행내역', date: '2022.06.27' },
        { title: '** 정리수납 프로그램 **', date: '2022.06.27' },
        { title: '한국여성의집 사무원 면접 합격자 공지', date: '2022.06.27' },
        { title: '** 불면증 개선 심신운동 프로그램 **', date: '2022.06.27' },
    ]
    constructor(private appRoot: HTMLElement) {
        this.render();
    }

    render() {
        const section = document.createElement('section');
        section.setAttribute('class', 'newPost_section');

        const div1 = document.createElement('div');
        div1.setAttribute('class', 'newPost_title');
        div1.innerText = `공지사항`;

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
            pWriter.innerText = `${this.data[i].date}`;
            div2Writer.appendChild(pWriter)

            div.appendChild(div2Title);
            div.appendChild(div2Writer);
            div2.appendChild(div);
        }
        section.appendChild(div2);
        this.appRoot.appendChild(section);
    }
}