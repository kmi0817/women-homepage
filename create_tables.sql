/* 후원 신청서 */
create table sponsorship(
	no INT NOT NULL AUTO_INCREMENT,
    created_at DATETIME NOT NULL DEFAULT current_timestamp,
    is_confirmed BOOLEAN NOT NULL DEFAULT 0, /* 승인 여부: TRUE-1, FALSE-0 */
    name VARCHAR(10) NOT NULL, /* 이름 */
    job VARCHAR(20) NOT NULL, /* 직업/소속 */
    email VARCHAR(30) NOT NULL, /* 이메일 */
    addr1 INT NOT NULL, /* 우편번호 */
    addr2 TEXT NOT NULL, /* 주소 */
    addr3 VARCHAR(30) NOT NULL, /* 상세주소 */
    tel VARCHAR(13) NOT NULL, /* 연락처 */
    recommender VARCHAR(10), /* 권유자 */
    purpose VARCHAR(6) NOT NULL, /* 후원목적 */
    method VARCHAR(8) NOT NULL, /* 후원 방법 */
    /* 이하 컬럼은 CMS 자동이체에 관함 */
    withdrawal_bank VARCHAR(10) default "-", /* 출금은행 */
    account VARCHAR(14) default "-", /* 계좌번호 */
    depositor VARCHAR(10) default "-", /* 예금주 */
    withdrawal_date INT default 0, /* 출금일*/
    amount INT default 0, /* 이체금액 */
    period VARCHAR(3) default "-" /* 이체기간 */,
    PRIMARY KEY(no),
    /* 도메인 제약조건 */
    CONSTRAINT CHK_email CHECK (email LIKE "%@%"),
    CONSTRAINT CHK_purpose CHECK (purpose in ("자활지원", "운영지원", "직원역량강화", "위임")),
    CONSTRAINT CHK_method CHECK (method in ("CMS 자동이체", "자동이체신청", "통장입금")),
    CONSTRAINT CHK_withdrawal_date CHECK (withdrawal_date in (0, 5, 15, 25)),
    CONSTRAINT CHK_amount CHECK (amount in (0, 5000, 10000, 20000, 30000, 50000)),
    CONSTRAINT CHK_period CHECK (period in ("-", "6개월", "1년", "2년", "3년", "평생"))
);



/* 자원봉사 신청서 */
CREATE TABLE volunteerwork(
	no INT NOT NULL AUTO_INCREMENT,
    created_at DATETIME NOT NULL DEFAULT current_timestamp,
    is_confirmed BOOLEAN NOT NULL DEFAULT 0, /* 승인 여부, TRUE-1, FALSE-0 */
    name VARCHAR(10) NOT NULL, /* 이름 */
    tel VARCHAR(13) NOT NULL DEFAULT "-", /* 전화번호 */
    hp VARCHAR(13) NOT NULL DEFAULT "-", /* 휴대폰 번호*/
    addr1 INT NOT NULL, /* 우편번호 */
    addr2 TEXT NOT NULL, /* 주소 */
    addr3 VARCHAR(30) NOT NULL, /* 상세주소 */
    email VARCHAR(30) NOT NULL CHECK (email LIKE "%@%"), /* 이메일 */
	experience BOOLEAN NOT NULL DEFAULT 0, /* 자원봉사 경험, FALSE-0,TRUE-1 */
    description TEXT,
	begin_date DATE NOT NULL DEFAULT (current_date()),
    end_date DATE NOT NULL DEFAULT (current_date()),
    speak TEXT,
    PRIMARY KEY(no)
);