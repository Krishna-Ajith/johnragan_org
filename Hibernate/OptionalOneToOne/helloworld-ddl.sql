
    alter table ITEMS 
        drop 
        foreign key FK42BEFA0FC3CDD36;

    alter table ITEM_SHIPMENT 
        drop 
        foreign key FK3AA6E546FC3CDD36;

    alter table ITEM_SHIPMENT 
        drop 
        foreign key FK3AA6E5461F2D7C96;

    drop table if exists ITEMS;

    drop table if exists ITEM_SHIPMENT;

    drop table if exists SHIPMENTS;

    create table ITEMS (
        ITEM_ID bigint not null auto_increment,
        ITEM_NAME varchar(255),
        SHIPMENT_ID bigint,
        primary key (ITEM_ID)
    );

    create table ITEM_SHIPMENT (
        SHIPMENT_ID bigint not null,
        ITEM_ID bigint,
        primary key (SHIPMENT_ID)
    );

    create table SHIPMENTS (
        SHIPMENT_ID bigint not null auto_increment,
        ADDRESS_STREET varchar(255) not null,
        ADDRESS_ZIPCODE varchar(255) not null,
        ADDRESS_CITY varchar(255) not null,
        primary key (SHIPMENT_ID)
    );

    alter table ITEMS 
        add index FK42BEFA0FC3CDD36 (SHIPMENT_ID), 
        add constraint FK42BEFA0FC3CDD36 
        foreign key (SHIPMENT_ID) 
        references SHIPMENTS (SHIPMENT_ID);

    alter table ITEM_SHIPMENT 
        add index FK3AA6E546FC3CDD36 (SHIPMENT_ID), 
        add constraint FK3AA6E546FC3CDD36 
        foreign key (SHIPMENT_ID) 
        references SHIPMENTS (SHIPMENT_ID);

    alter table ITEM_SHIPMENT 
        add index FK3AA6E5461F2D7C96 (ITEM_ID), 
        add constraint FK3AA6E5461F2D7C96 
        foreign key (ITEM_ID) 
        references ITEMS (ITEM_ID);
