
    drop table if exists USERS;

    create table USERS (
        USER_ID bigint not null auto_increment,
        HOME_STREET varchar(255),
        HOME_ZIPCODE varchar(255),
        HOME_CITY varchar(255),
        USER_NAME varchar(255),
        primary key (USER_ID)
    );
