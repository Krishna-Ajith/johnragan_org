
    alter table USERS 
        drop 
        foreign key FK4D495E8FE8F0B2F;

    drop table if exists ADDRESSES;

    drop table if exists USERS;

    create table ADDRESSES (
        ADDRESS_ID bigint not null auto_increment,
        ADDRESS_STREET varchar(255) not null,
        ADDRESS_ZIPCODE varchar(255) not null,
        ADDRESS_CITY varchar(255) not null,
        primary key (ADDRESS_ID)
    );

    create table USERS (
        USER_ID bigint not null auto_increment,
        USER_NAME varchar(255),
        SHIPPING_ADDRESS_ID bigint,
        primary key (USER_ID)
    );

    alter table USERS 
        add index FK4D495E8FE8F0B2F (SHIPPING_ADDRESS_ID), 
        add constraint FK4D495E8FE8F0B2F 
        foreign key (SHIPPING_ADDRESS_ID) 
        references ADDRESSES (ADDRESS_ID);
