
    alter table BIDS 
        drop 
        foreign key FK1F1B161F2D7C96;

    drop table if exists BIDS;

    drop table if exists ITEMS;

    create table BIDS (
        BID_ID bigint not null auto_increment,
        DOLLARS_BID varchar(255),
        ITEM_ID bigint not null,
        primary key (BID_ID)
    );

    create table ITEMS (
        ITEM_ID bigint not null auto_increment,
        ITEM_NAME varchar(255),
        primary key (ITEM_ID)
    );

    alter table BIDS 
        add index FK1F1B161F2D7C96 (ITEM_ID), 
        add constraint FK1F1B161F2D7C96 
        foreign key (ITEM_ID) 
        references ITEMS (ITEM_ID);
