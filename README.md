# women-homepage
한국여성의집

1. Installation
```
npm install express
npm install ejs
npm install method-override
npm install --save-dev nodemon
npm install mysql
npm install http
npm install crypto --save
npm install sanitize-html // XXS 관련 보안 라이브러리
npm install xlsx
```

2. Database
- config.js 파일 생성 후 아래 코드 입력
```
module.exports = {
    host: "",
    port: ,
    user: "",
    password: "",
    database: ""
};
```

3. 약속
- 비밀상담 게시판에서 게시글과 댓글 삭제 불가
- 관리자 페이지에서 커뮤니티 내 모든 게시글 CRUD 처리