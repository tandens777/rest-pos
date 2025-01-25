DROP TABLE IF EXISTS public.order_type_aliases;

CREATE TABLE ORDER_TYPE_ALIASES (
    order_type char(1) NOT NULL,
    tbl_num int NOT NULL,
    tbl_name varchar(20) not null
);

ALTER TABLE ORDER_TYPE_ALIASES ADD CONSTRAINT PK_ORDER_TYPE_ALIASES PRIMARY KEY (order_type, tbl_num);

ALTER TABLE public.order_type_aliases ADD CONSTRAINT fk_order_type_aliases_order_type FOREIGN KEY (order_type) 
    REFERENCES public.order_type (order_type) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE UNIQUE INDEX idx_order_type_aliases_order_type_nm ON order_type_aliases(order_type, tbl_name);

GRANT SELECT, UPDATE, INSERT, DELETE ON order_type_aliases TO public;

alter table food_delivery_app add column table_count int not null default 0;

