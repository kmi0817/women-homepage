import { BaseComponent } from '../BaseComponent.js';

export class Header extends BaseComponent<HTMLElement> {
    constructor() {
        super(`<section><div class="menuLogo">
        <a href="/" data-link>한국여성의집</a>
        </div>
        <div class="menuList">
        <li class="menucell"><a href="/program" data-link>프로그램 안내</a></li>
        <li class="menucell"><a href="/" data-link>사랑의 나눔터</a>
            <ul class="drop-down">
                <li><a href="#">후원안내</a></li>
                <li><a href="#">후원신청</a></li>
                <li><a href="#">자원봉사안내</a></li>
                <li><a href="#">자원봉사신청</a></li>
            </ul>
        </li>
        <li class="menucell"><a href="/" data-link>커뮤니티</a>
            <li><a href="#">공지사항</a></li>
            <ul class="drop-down">
                <li><a href="#">시설이미지</a></li>
                <li><a href="#">자유게시판</a></li>
                <li><a href="#">포토갤러리</a></li>
            </ul>
        </li>
        <li class="menucell"><a href="/" data-link>소소뜨라</a></li>
    </div>
    </section>`);
    }
}