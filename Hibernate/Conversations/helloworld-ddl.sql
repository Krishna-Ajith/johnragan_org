
    drop table if exists USERS;

    create table USERS (
        USER_ID bigint not null auto_increment,
        MEMBERSHIP_LEVEL varchar(255),
        USER_NAME varchar(255),
        primary key (USER_ID)
    );
