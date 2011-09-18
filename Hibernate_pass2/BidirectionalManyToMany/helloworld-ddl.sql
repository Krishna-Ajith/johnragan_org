
    alter table ITEM_CATEGORY 
        drop 
        foreign key FK5C7030AA1F2D7C96;

    alter table ITEM_CATEGORY 
        drop 
        foreign key FK5C7030AADDE272B6;

    drop table if exists CATEGORIES;

    drop table if exists ITEMS;

    drop table if exists ITEM_CATEGORY;

    create table CATEGORIES (
        CATEGORY_ID bigint not null auto_increment,
        CATEGORY_NAME varchar(255),
        primary key (CATEGORY_ID)
    );

    create table ITEMS (
        ITEM_ID bigint not null auto_increment,
        ITEM_NAME varchar(255),
        primary key (ITEM_ID)
    );

    create table ITEM_CATEGORY (
        ITEM_ID bigint not null,
        CATEGORY_ID bigint not null,
        primary key (ITEM_ID, CATEGORY_ID)
    );

    alter table ITEM_CATEGORY 
        add index FK5C7030AA1F2D7C96 (ITEM_ID), 
        add constraint FK5C7030AA1F2D7C96 
        foreign key (ITEM_ID) 
        references ITEMS (ITEM_ID);

    alter table ITEM_CATEGORY 
        add index FK5C7030AADDE272B6 (CATEGORY_ID), 
        add constraint FK5C7030AADDE272B6 
        foreign key (CATEGORY_ID) 
        references CATEGORIES (CATEGORY_ID);
