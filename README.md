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
npm install multer@1.4.4 // 1.4.4로 다운받아야지 파일 내 한글이 깨지지 않음
npm install serve-static 
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
    - 회원 등급: 1) 관리자 2) 관계자 3) 일반 회원
        - 관리자: 관리자 페이지 접근 O (회원과 모든 게시글 및 후원/자원봉사 신청 접근 CRUD 가능)
        - 관계자: 한국여성의집 관계자로서, 게시글 작성 가능
        - 일반 회원: (일반 회원이 필요한지?)
        - **관리자가 관리자 페이지에서 한국여성의집 관계자의 등급을 직접 조정**

4. 파일 정리
    - /
        - GET: 메인 화면 페이지, 프로그램 페이지, 소스뜨라 페이지
    - /nanumteo
        - GET: 후원/자원봉사 안내 페이지, 후원/자원봉사 신청 페이지, 비밀상담 목록 페이지, 비밀상담 게시글 상세 페이지
        - POST: 후원/자원봉사/비밀상담/비밀상담댓글 등록
        - PATCH: 비밀상담/비밀상담댓글 수정