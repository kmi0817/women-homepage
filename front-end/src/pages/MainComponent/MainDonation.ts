export class MainDonation {
    constructor(private appRoot: HTMLElement) {
        this.render();
    }

    render() {
        const section = document.createElement('section');
        section.setAttribute('class', 'mainDonation_section');

        const title = document.createElement('p');
        title.setAttribute('class', `maindonation_title`);
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        span1.innerText = `후원 `;
        span2.innerText = `계좌`;
        title.appendChild(span1);
        title.appendChild(span2);
        section.appendChild(title);

        const description = document.createElement('p');
        description.setAttribute('class', 'mainDonation_desc');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');

        p1.innerText = `마음과 정성으로 주시는 것이며,`;
        p2.innerText = `영혼을 살찌우고 감사로 나아가는 밑거름이 될 것입니다.`;
        description.appendChild(p1);
        description.appendChild(p2);
        section.appendChild(description);

        const table = document.createElement('table');
        table.setAttribute('class', 'mainDonation_table');
        const tr1 = document.createElement('tr');
        const tr1td1 = document.createElement('td');
        const tr1td2 = document.createElement('td');
        tr1td1.innerText = `입금은행(계좌)`;
        tr1td2.innerText = `하나은행 379-810001-18204`;
        tr1.appendChild(tr1td1);
        tr1.appendChild(tr1td2);
        table.appendChild(tr1);

        const tr2 = document.createElement('tr');
        const tr2td1 = document.createElement('td');
        const tr2td2 = document.createElement('td');
        tr2td1.innerText = `예금주`;
        tr2td2.innerText = `한국여성의집`;
        tr2.appendChild(tr2td1);
        tr2.appendChild(tr2td2);
        table.appendChild(tr2);

        section.appendChild(table);
        this.appRoot.appendChild(section);
    }
}