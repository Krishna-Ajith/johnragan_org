
    alter table MESSAGES 
        drop 
        foreign key FK131AF14C3CD7F3EA;

    drop table if exists MESSAGES;

    create table MESSAGES (
        MESSAGE_ID bigint not null auto_increment,
        MESSAGE_TEXT varchar(255),
        NEXT_MESSAGE_ID bigint,
        primary key (MESSAGE_ID)
    );

    alter table MESSAGES 
        add index FK131AF14C3CD7F3EA (NEXT_MESSAGE_ID), 
        add constraint FK131AF14C3CD7F3EA 
        foreign key (NEXT_MESSAGE_ID) 
        references MESSAGES (MESSAGE_ID);
