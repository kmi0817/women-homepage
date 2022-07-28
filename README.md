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