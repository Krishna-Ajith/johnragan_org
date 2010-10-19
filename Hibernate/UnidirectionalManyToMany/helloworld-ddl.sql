
    alter table CATEGORY_ITEM 
        drop 
        foreign key FKCFAEEDB45C8081;

    alter table CATEGORY_ITEM 
        drop 
        foreign key FKCFAEEDB4FCB36ECB;

    drop table if exists CATEGORIES;

    drop table if exists CATEGORY_ITEM;

    drop table if exists ITEMS;

    create table CATEGORIES (
        CATEGORY_ID bigint not null auto_increment,
        CATEGORY_NAME varchar(255),
        primary key (CATEGORY_ID)
    );

    create table CATEGORY_ITEM (
        CATEGORY_ID bigint not null,
        ITEM_ID bigint not null,
        primary key (CATEGORY_ID, ITEM_ID)
    );

    create table ITEMS (
        ITEM_ID bigint not null auto_increment,
        ITEM_NAME varchar(255),
        primary key (ITEM_ID)
    );

    alter table CATEGORY_ITEM 
        add index FKCFAEEDB45C8081 (ITEM_ID), 
        add constraint FKCFAEEDB45C8081 
        foreign key (ITEM_ID) 
        references CATEGORIES (CATEGORY_ID);

    alter table CATEGORY_ITEM 
        add index FKCFAEEDB4FCB36ECB (CATEGORY_ID), 
        add constraint FKCFAEEDB4FCB36ECB 
        foreign key (CATEGORY_ID) 
        references ITEMS (ITEM_ID);
