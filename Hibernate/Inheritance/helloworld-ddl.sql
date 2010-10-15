
    drop table if exists USERS;

    create table USERS (
        DTYPE varchar(31) not null,
        USER_ID bigint not null auto_increment,
        USER_NAME varchar(255),
        ZONE varchar(255),
        primary key (USER_ID)
    );
