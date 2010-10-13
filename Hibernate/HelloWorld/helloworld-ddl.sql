
    alter table MESSAGES 
        drop 
        foreign key FK_NEXT_MESSAGE;

    drop table if exists MESSAGES;

    create table MESSAGES (
        MESSAGE_ID bigint not null,
        MESSAGE_TEXT varchar(255),
        NEXT_MESSAGE_ID bigint,
        primary key (MESSAGE_ID)
    );

    alter table MESSAGES 
        add index FK_NEXT_MESSAGE (NEXT_MESSAGE_ID), 
        add constraint FK_NEXT_MESSAGE 
        foreign key (NEXT_MESSAGE_ID) 
        references MESSAGES (MESSAGE_ID);
