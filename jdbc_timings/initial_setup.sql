drop database jdbc_basics;
create database jdbc_basics;

use jdbc_basics;

create table employees (
	empno int PRIMARY KEY AUTO_INCREMENT,
	ename varchar(64) not null,
	job varchar(64) not null,
	hiredate date not null,
	sal int not null,
	comm int
) default charset=utf8;

INSERT INTO employees (ENAME, JOB, HIREDATE, SAL, COMM) VALUES
    ('SMITH', 'CLERK', '2008-7-04', 800, NULL);
INSERT INTO employees (ENAME, JOB, HIREDATE, SAL, COMM) VALUES
    ('ROBERTS', 'FINANCE', '2010-3-07', 1200, NULL);