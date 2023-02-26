import { makeElement } from '../../api/api.js';

type HistoryDataType = {
    date: string;
    description: Array<string>;
};

export class MainHistory {
    private historyDataRecent: Array<HistoryDataType> = [
        {
            date: '2022', description:
                [
                    '한국청소년활동진흥원 안전컨설팅(전기/소방/건축/토목/위생) 기관 선정',
                    '한국청소년활동진흥원 안전컨설팅(전기/소방/건축/토목/위생) 기관 선정',
                ]
        },
        {
            date: '2021', description:
                [
                    '한국청소년활동진흥원 안전컨설팅(전기/소방/건축/토목/위생) 기관 선정',
                    '한국청소년활동진흥원 안전컨설팅(전기/소방/건축/토목/위생) 기관 선정',
                ]
        },
    ];

    private historyDataEtc: Array<HistoryDataType> = [
        {
            date: '2020', description:
                [
                    '한국청소년활동진흥원 안전컨설팅(전기/소방/건축/토목/위생) 기관 선정',
                    '한국청소년활동진흥원 안전컨설팅(전기/소방/건축/토목/위생) 기관 선정',
                ]
        },
        {
            date: '2019', description:
                [
                    '한국청소년활동진흥원 안전컨설팅(전기/소방/건축/토목/위생) 기관 선정',
                    '한국청소년활동진흥원 안전컨설팅(전기/소방/건축/토목/위생) 기관 선정',
                ]
        },
    ];

    constructor(private appRoot: HTMLElement) {
        this.render();
    }

    render() {
        const title = makeElement('div', 'class', 'history_title');
        const title_title = makeElement('p', 'class', 'history_title_title');
        title_title.innerText = `연혁`;
        const title_desc = makeElement('p', 'class', 'history_title_desc');
        title_desc.innerText = `한국여성의집이 남겨온 발자취`;
        title.appendChild(title_title);
        title.appendChild(title_desc);

        const buttons = makeElement('div', 'class', 'history_buttons');
        const recentButton = makeElement('button', 'class', 'recent_button');
        recentButton.innerText = `최근 2개년도`;
        const etcButton = makeElement('button', 'class', 'etc_button');
        etcButton.innerText = `그 외`;
        buttons.appendChild(recentButton);
        buttons.appendChild(etcButton);

        const list = makeElement('div', 'class', 'history_list');
        this.historyList(list, this.historyDataRecent);
        recentButton.addEventListener('click', (e) => {
            this.removeElement();
            this.historyList(list, this.historyDataRecent)
        });
        etcButton.addEventListener('click', (e) => {
            this.removeElement();
            this.historyList(list, this.historyDataEtc);
        });

        this.appRoot.appendChild(title);
        this.appRoot.appendChild(buttons);
        this.appRoot.appendChild(list);
    }

    historyList(parent: HTMLElement, listData: Array<HistoryDataType>) {
        for (let i = 0; i < listData.length; i++) {
            const div = makeElement('div', 'class', 'list_div');
            const title = makeElement('p', 'class', 'list_title');
            title.innerText = listData[i].date;
            const desc = makeElement('ul', 'class', 'list_ul');
            for (let k = 0; k < listData[i].description.length; k++) {
                const li = makeElement('li', 'class', 'list_ul_li');
                li.innerText = listData[i].description[k];
                desc.appendChild(li);
            }
            div.appendChild(title);
            div.appendChild(desc);
            parent.appendChild(div);
        }
    }

    removeElement() {
        const removeDiv = document.querySelector('.history_list') as HTMLElement;
        removeDiv.innerHTML = ``;
    }
}