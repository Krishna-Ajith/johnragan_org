drop database sql_cookbook;
create database sql_cookbook;

use sql_cookbook;


create table emp (
empno int not null,
ename varchar(64) not null,
job varchar(64) not null,
mgr int,
hiredate date not null,
sal int not null,
comm int,
deptno int not null,
primary key (empno)
) default charset=utf8;

create view new_emps as
    select empno, ename, job, deptno
from emp;

create table dept (
deptno int not null,
dname varchar(64) not null,
loc varchar(64) not null,
primary key (deptno)
) default charset=utf8;

create table dept_east (
deptno int not null,
dname varchar(64) not null,
loc varchar(64) not null,
primary key (deptno)
) default charset=utf8;

create table dept_empty_copy
as
select *
from dept
where 1 = 0;

create table emp_bonus (
empno int not null,
received date not null,
type int not null,
primary key(empno)
) default charset=utf8;

create table emp_bonus_39 (
empno int not null,
received date not null,
type int not null
) default charset=utf8;

create table emp_bonus_40 (
empno int not null,
received date not null,
type int not null
) default charset=utf8;

create table new_sal (
deptno int not null,
sal int not null
) default charset=utf8;

create table dupes (
    id int not null, 
    name varchar(10) not null
) default charset=utf8;

create table dept_accidents ( 
    deptno int not null,
    accident_name varchar(20) 
) default charset=utf8;

create table t1 (
    id int not null,
    primary key(id)
) default charset=utf8;

create table t10 (
    id int not null,
    primary key(id)
) default charset=utf8;

alter table emp add constraint FK2D793B6F8D0BF0BD foreign key (deptno)
references dept (deptno);

#alter table emp_bonus add constraint FK2D793B6F8D0BF0CD foreign key (empno)
#references emp (empno);

alter table emp_bonus_39 add constraint FK2E793B6F8D0BF0CD foreign key (empno)
references emp (empno);

alter table emp_bonus_40 add constraint FK2D893B6F8D0BF0CD foreign key (empno)
references emp (empno);

alter table new_sal add constraint FK2D793B6F2D0BF0BD foreign key (deptno)
references dept (deptno);

alter table dept_accidents add constraint FK2D793B2F2D0BF7BD foreign key (deptno)
references dept (deptno);

INSERT INTO dept (DEPTNO, DNAME, LOC) VALUES 
    (10, 'ACCOUNTING', 'NEW YORK'),
    (20, 'RESEARCH', 'DALLAS'),
    (30, 'SALES', 'CHICAGO'),
    (40, 'OPERATIONS', 'BOSTON');

INSERT INTO emp (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO) VALUES
    (7369, 'SMITH', 'CLERK', 7902, 12/17/1980, 800, NULL, 20),
    (7499, 'ALLEN', 'SALESMAN', 7698, 02/20/1981, 1600, 300, 30),
    (7521, 'WARD', 'SALESMAN', 7698, 02/22/1981, 1250, 500, 30),
    (7566, 'JONES', 'MANAGER', 7839, 04/02/1981, 2975, NULL, 20),
    (7654, 'MARTIN', 'SALESMAN', 7698, 09/28/1981, 1250, 1400, 30),
    (7698, 'BLAKE', 'MANAGER', 7839, 05/01/1981, 2850, NULL, 30),
    (7782, 'CLARK', 'MANAGER', 7839, 06/09/1981, 2450, NULL, 10),
    (7788, 'SCOTT', 'ANALYST', 7566, 12/09/1982, 3000, NULL, 20),
    (7839, 'KING', 'PRESIDENT', NULL, 11/17/1981, 5000, NULL, 10),
    (7844, 'TURNER', 'SALESMAN', 7698, 09/08/1981, 1500, 0, 30),
    (7876, 'ADAMS', 'CLERK', 7788, 01/12/1983, 1100, NULL, 20),
    (7900, 'JAMES', 'CLERK', 7698, 12/03/1981, 950, NULL, 30),
    (7902, 'FORD', 'ANALYST', 7566, 12/03/1981, 3000, NULL, 20), 
    (7934, 'MILLER', 'CLERK', 7782, 01/23/1982, 1300, NULL, 10);

INSERT INTO emp_bonus (EMPNO, RECEIVED, TYPE) VALUES
(7369, 03/15/2005, 1),
(7900, 03/15/2005, 2),
(7788, 03/15/2005, 3);

INSERT INTO emp_bonus_39 (EMPNO, RECEIVED, TYPE) VALUES
(7934, 03/17/2005, 1),
(7934, 02/15/2005, 2),
(7839, 02/15/2005, 3),
(7782, 02/15/2005, 4);

INSERT INTO emp_bonus_40 (EMPNO, RECEIVED, TYPE) VALUES
(7934, 03/17/2005, 1),
(7934, 02/15/2005, 2);

INSERT INTO new_sal (deptno, sal) VALUES
(10, 4000);

insert into dupes values (1, 'NAPOLEON');
insert into dupes values (2, 'DYNAMITE');
insert into dupes values (3, 'DYNAMITE');
insert into dupes values (4, 'SHE SELLS');
insert into dupes values (5, 'SEA SHELLS');
insert into dupes values (6, 'SEA SHELLS');
insert into dupes values (7, 'SEA SHELLS');

insert into dept_accidents values (10,'BROKEN FOOT');
insert into dept_accidents values (10,'FLESH WOUND');
insert into dept_accidents values (20,'FIRE');
insert into dept_accidents values (20,'FIRE');
insert into dept_accidents values (20,'FLOOD');
insert into dept_accidents values (30,'BRUISED GLUTE');

INSERT INTO t1 (ID) VALUES (1);

INSERT INTO t10 (ID) VALUES 
    (1),
    (2),
    (3),
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10);

create view V33
as
select ename,job,sal
from emp
where job = 'CLERK';

create view V66 as
select ename as data
from emp
where deptno=10
union all
select concat(ename,', $',sal,'.00') as data
from emp
where deptno=20
union all
select concat(ename,deptno) as data
from emp
where deptno=30;