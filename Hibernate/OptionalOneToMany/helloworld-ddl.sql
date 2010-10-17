
    alter table ITEM_BUYER 
        drop 
        foreign key FKDE3D05671F2D7C96;

    alter table ITEM_BUYER 
        drop 
        foreign key FKDE3D0567984B2196;

    drop table if exists ITEMS;

    drop table if exists ITEM_BUYER;

    drop table if exists USERS;

    create table ITEMS (
        ITEM_ID bigint not null auto_increment,
        ITEM_NAME varchar(255),
        primary key (ITEM_ID)
    );

    create table ITEM_BUYER (
        ITEM_ID bigint not null,
        USER_ID bigint,
        primary key (ITEM_ID)
    );

    create table USERS (
        USER_ID bigint not null auto_increment,
        USER_NAME varchar(255),
        primary key (USER_ID)
    );

    alter table ITEM_BUYER 
        add index FKDE3D05671F2D7C96 (ITEM_ID), 
        add constraint FKDE3D05671F2D7C96 
        foreign key (ITEM_ID) 
        references ITEMS (ITEM_ID);

    alter table ITEM_BUYER 
        add index FKDE3D0567984B2196 (USER_ID), 
        add constraint FKDE3D0567984B2196 
        foreign key (USER_ID) 
        references USERS (USER_ID);
