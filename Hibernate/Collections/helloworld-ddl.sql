
    alter table ADDRESSES 
        drop 
        foreign key FKDA388B82984B2196;

    alter table BANDS_ORDERED 
        drop 
        foreign key FK34AB55CC984B2196;

    alter table FRIEND_NAMES 
        drop 
        foreign key FKC5815247984B2196;

    alter table JOB_HISTORY 
        drop 
        foreign key FK950549D2984B2196;

    alter table SIBLINGS 
        drop 
        foreign key FK3899A1F1984B2196;

    alter table SIBLINGS_ORDERED 
        drop 
        foreign key FK9D3D4BFF984B2196;

    drop table if exists ADDRESSES;

    drop table if exists BANDS_ORDERED;

    drop table if exists FRIEND_NAMES;

    drop table if exists JOB_HISTORY;

    drop table if exists SIBLINGS;

    drop table if exists SIBLINGS_ORDERED;

    drop table if exists USERS;

    create table ADDRESSES (
        USER_ID bigint not null,
        ADDRESS_STREET varchar(255) not null,
        ADDRESS_ZIPCODE varchar(255) not null,
        ADDRESS_CITY varchar(255) not null,
        primary key (USER_ID, ADDRESS_STREET, ADDRESS_ZIPCODE, ADDRESS_CITY)
    );

    create table BANDS_ORDERED (
        USER_ID bigint not null,
        BAND_NAME varchar(255) not null,
        primary key (USER_ID, BAND_NAME)
    );

    create table FRIEND_NAMES (
        USER_ID bigint not null,
        NAME varchar(255) not null,
        primary key (USER_ID, NAME)
    );

    create table JOB_HISTORY (
        USER_ID bigint not null,
        JOB varchar(255),
        POSITION integer not null,
        primary key (USER_ID, POSITION)
    );

    create table SIBLINGS (
        USER_ID bigint not null,
        BIRTHDAY varchar(255),
        SIBLING varchar(255),
        primary key (USER_ID, SIBLING)
    );

    create table SIBLINGS_ORDERED (
        USER_ID bigint not null,
        BIRTHDAY varchar(255),
        SIBLING varchar(255),
        primary key (USER_ID, SIBLING)
    );

    create table USERS (
        USER_ID bigint not null auto_increment,
        USER_NAME varchar(255),
        primary key (USER_ID)
    );

    alter table ADDRESSES 
        add index FKDA388B82984B2196 (USER_ID), 
        add constraint FKDA388B82984B2196 
        foreign key (USER_ID) 
        references USERS (USER_ID);

    alter table BANDS_ORDERED 
        add index FK34AB55CC984B2196 (USER_ID), 
        add constraint FK34AB55CC984B2196 
        foreign key (USER_ID) 
        references USERS (USER_ID);

    alter table FRIEND_NAMES 
        add index FKC5815247984B2196 (USER_ID), 
        add constraint FKC5815247984B2196 
        foreign key (USER_ID) 
        references USERS (USER_ID);

    alter table JOB_HISTORY 
        add index FK950549D2984B2196 (USER_ID), 
        add constraint FK950549D2984B2196 
        foreign key (USER_ID) 
        references USERS (USER_ID);

    alter table SIBLINGS 
        add index FK3899A1F1984B2196 (USER_ID), 
        add constraint FK3899A1F1984B2196 
        foreign key (USER_ID) 
        references USERS (USER_ID);

    alter table SIBLINGS_ORDERED 
        add index FK9D3D4BFF984B2196 (USER_ID), 
        add constraint FK9D3D4BFF984B2196 
        foreign key (USER_ID) 
        references USERS (USER_ID);
