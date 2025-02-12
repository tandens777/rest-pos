-- Table: public.item_category_type

-- DROP TABLE IF EXISTS public.item_category_type;

CREATE TABLE IF NOT EXISTS public.item_category_type
(
    cat_type_id integer NOT NULL,
    cat_type_desc character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_item_category_type PRIMARY KEY (cat_type_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_category_type
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.item_category_type TO PUBLIC;

GRANT ALL ON TABLE public.item_category_type TO postgres;

insert into item_category_type values (1, 'FOOD MENU');
insert into item_category_type values (2, 'INGREDIENTS');

-------------------------------------------------------------------------------
-- Table: public.item_tag

-- DROP TABLE IF EXISTS public.item_tag;

CREATE TABLE IF NOT EXISTS public.item_tag
(
    item_tag_id integer NOT NULL,
    item_tag_desc character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_item_tag PRIMARY KEY (item_tag_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_tag
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.item_tag TO PUBLIC;

GRANT ALL ON TABLE public.item_tag TO postgres;

insert into item_tag values (1, 'MOST FAVORITE');
insert into item_tag values (2, 'LUNCH SPECIALS');
insert into item_tag values (4, 'PROMOS');
insert into item_tag values (3, 'VALENTINE''S SPECIAL');

-------------------------------------------------------------------------------
-- Table: public.item

-- DROP TABLE IF EXISTS public.item;

CREATE TABLE IF NOT EXISTS public.item
(
    item_id integer NOT NULL,
    item_code character varying(50) COLLATE pg_catalog."default",
    item_desc character varying(255) COLLATE pg_catalog."default" NOT NULL,
    short_nm character varying(255) COLLATE pg_catalog."default",
    sort_order integer,
    chinese_item_desc character varying(2000) COLLATE pg_catalog."default",
    cat_type_id integer NOT NULL,

    parent_cat_id integer NOT NULL,
    
    station_id integer NOT NULL,
    per100g_flag character(1) COLLATE pg_catalog."default",
    default_price double precision,
    addon_price double precision,
    picture_src character varying(255) COLLATE pg_catalog."default",
    default_unit_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    disc_exempt character(1) COLLATE pg_catalog."default",
    allow_sc_on_exempt character(1) COLLATE pg_catalog."default",
    non_vat_flag character(1) COLLATE pg_catalog."default" NOT NULL,
    active_flag character(1) COLLATE pg_catalog."default" NOT NULL,
    show_on_pos_flag character(1) COLLATE pg_catalog."default" NOT NULL,
    reorder_limit integer NOT NULL,
    track_invty_flag character(1) COLLATE pg_catalog."default",
    send_to_printer_flag character(1) COLLATE pg_catalog."default",
    allow_dinein_flag character(1) COLLATE pg_catalog."default",
    allow_pickup_flag character(1) COLLATE pg_catalog."default",
    allow_delivery_flag character(1) COLLATE pg_catalog."default",
    lastupduserid character varying(20) COLLATE pg_catalog."default",
    lastupddt timestamp without time zone,
    CONSTRAINT pk_item PRIMARY KEY (item_id),
    CONSTRAINT fk_item_station FOREIGN KEY (station_id)
        REFERENCES public.food_station (station_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_item_item_category_type FOREIGN KEY (cat_type_id)
        REFERENCES public.item_category_type (cat_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_item_unit FOREIGN KEY (default_unit_code)
        REFERENCES public.unit (unit_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item TO PUBLIC;

GRANT ALL ON TABLE public.item TO postgres;
-- Index: idx_item2

-- DROP INDEX IF EXISTS public.idx_item2;

CREATE INDEX IF NOT EXISTS idx_item2
    ON public.item USING btree
    (item_id ASC NULLS LAST, item_desc COLLATE pg_catalog."default" ASC NULLS LAST, cat_type_id ASC NULLS LAST, short_nm COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_item22

-- DROP INDEX IF EXISTS public.idx_item22;

CREATE INDEX IF NOT EXISTS idx_item22
    ON public.item USING btree
    (station_id ASC NULLS LAST, item_code COLLATE pg_catalog."default" ASC NULLS LAST, sort_order ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_item_allow_dinein_flag

-- DROP INDEX IF EXISTS public.idx_item_allow_dinein_flag;

CREATE INDEX IF NOT EXISTS idx_item_allow_dinein_flag
    ON public.item USING btree
    (item_id ASC NULLS LAST, allow_dinein_flag COLLATE pg_catalog."default" ASC NULLS LAST, active_flag COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_item_allow_dlvry_flag

-- DROP INDEX IF EXISTS public.idx_item_allow_dlvry_flag;

CREATE INDEX IF NOT EXISTS idx_item_allow_dlvry_flag
    ON public.item USING btree
    (item_id ASC NULLS LAST, allow_delivery_flag COLLATE pg_catalog."default" ASC NULLS LAST, active_flag COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_item_allow_pickup_flag

-- DROP INDEX IF EXISTS public.idx_item_allow_pickup_flag;

CREATE INDEX IF NOT EXISTS idx_item_allow_pickup_flag
    ON public.item USING btree
    (item_id ASC NULLS LAST, allow_pickup_flag COLLATE pg_catalog."default" ASC NULLS LAST, active_flag COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_item_item_code

-- DROP INDEX IF EXISTS public.idx_item_item_code;

CREATE UNIQUE INDEX IF NOT EXISTS idx_item_item_code
    ON public.item USING btree
    (item_code COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_item_show_on_pos_flag

-- DROP INDEX IF EXISTS public.idx_item_show_on_pos_flag;

CREATE INDEX IF NOT EXISTS idx_item_show_on_pos_flag
    ON public.item USING btree
    (item_id ASC NULLS LAST, show_on_pos_flag COLLATE pg_catalog."default" ASC NULLS LAST, active_flag COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;



-------------------------------------------------------------------------------
-- Table: public.item_tag_items

-- DROP TABLE IF EXISTS public.item_tag_items;

CREATE TABLE IF NOT EXISTS public.item_tag_items
(
    item_tag_id integer NOT NULL,
    item_id integer NOT NULL,
    CONSTRAINT pk_item_tag_items PRIMARY KEY (item_tag_id, item_id),
    CONSTRAINT fk_item_tag_items_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_item_tag_items_item_tag FOREIGN KEY (item_tag_id)
        REFERENCES public.item_tag (item_tag_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_tag_items
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item_tag_items TO PUBLIC;

GRANT ALL ON TABLE public.item_tag_items TO postgres;

------------------------------------------------------------------------------
-- Table: public.item_unit_conversion

-- DROP TABLE IF EXISTS public.item_unit_conversion;

CREATE TABLE IF NOT EXISTS public.item_unit_conversion
(
    item_id integer NOT NULL,
    unit_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    conversion_to_default double precision NOT NULL,
    CONSTRAINT pk_item_unit_conversion PRIMARY KEY (item_id, unit_code),
    CONSTRAINT fk_item_unit_conversion_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_item_unit_conversion_unit FOREIGN KEY (unit_code)
        REFERENCES public.unit (unit_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_unit_conversion
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item_unit_conversion TO PUBLIC;

GRANT ALL ON TABLE public.item_unit_conversion TO postgres;

-----------------------------------------------------------------------------------
-- Table: public.item_usage_setup

-- DROP TABLE IF EXISTS public.item_usage_setup;

CREATE TABLE IF NOT EXISTS public.item_usage_setup
(
    item_id integer NOT NULL,
    rm_item_id integer NOT NULL,
    used_qty double precision NOT NULL,
    unit_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_item_usage_setup PRIMARY KEY (item_id, rm_item_id),
    CONSTRAINT fk_item_usage_setup_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_item_usage_setup_item2 FOREIGN KEY (rm_item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_item_usage_setup_unit FOREIGN KEY (unit_code)
        REFERENCES public.unit (unit_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_usage_setup
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item_usage_setup TO PUBLIC;

GRANT ALL ON TABLE public.item_usage_setup TO postgres;
-- Index: idx_item_item_usage_setup

-- DROP INDEX IF EXISTS public.idx_item_item_usage_setup;

CREATE INDEX IF NOT EXISTS idx_item_item_usage_setup
    ON public.item_usage_setup USING btree
    (item_id ASC NULLS LAST, rm_item_id ASC NULLS LAST)
    TABLESPACE pg_default;

------------------------------------------------------------------------
-- Table: public.storage_location

-- DROP TABLE IF EXISTS public.storage_location;

CREATE TABLE IF NOT EXISTS public.storage_location
(
    location_id integer NOT NULL,
    location_nm character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_storage_location PRIMARY KEY (location_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.storage_location
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.storage_location TO PUBLIC;

GRANT ALL ON TABLE public.storage_location TO postgres;

--------------------------------------------------------------------------
-- Table: public.item_balance

-- DROP TABLE IF EXISTS public.item_balance;

CREATE TABLE IF NOT EXISTS public.item_balance
(
    location_id integer NOT NULL,
    item_id integer NOT NULL,
    qty_on_hand double precision NOT NULL,
    unit_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_item_balance PRIMARY KEY (location_id, item_id),
    CONSTRAINT fk_item_balance_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_item_balance_location FOREIGN KEY (location_id)
        REFERENCES public.storage_location (location_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_balance
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item_balance TO PUBLIC;

GRANT ALL ON TABLE public.item_balance TO postgres;

---------------------------------------------------------------------------
-- Table: public.item_stockard

-- DROP TABLE IF EXISTS public.item_stockard;

CREATE TABLE IF NOT EXISTS public.item_stockard
(
    location_id integer NOT NULL,
    item_id integer NOT NULL,
    txn_date timestamp without time zone NOT NULL,
    inout_indc character(1) COLLATE pg_catalog."default" NOT NULL,
    txn_ref_type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    txn_ref_no character varying(10) COLLATE pg_catalog."default" NOT NULL,
    txn_qty double precision NOT NULL,
    lastupduserid character varying(20) COLLATE pg_catalog."default" NOT NULL,
    ref_date timestamp without time zone NOT NULL,
    run_qty_balance double precision NOT NULL,
    invty_qty_balance double precision,
    unit_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_item_stockard PRIMARY KEY (location_id, item_id, txn_date, inout_indc),
    CONSTRAINT fk_item_stockard_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_item_stockard_location FOREIGN KEY (location_id)
        REFERENCES public.storage_location (location_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_stockard
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item_stockard TO PUBLIC;

GRANT ALL ON TABLE public.item_stockard TO postgres;
-- Index: idx_stockard2

-- DROP INDEX IF EXISTS public.idx_stockard2;

CREATE INDEX IF NOT EXISTS idx_stockard2
    ON public.item_stockard USING btree
    (location_id ASC NULLS LAST, item_id ASC NULLS LAST, txn_date ASC NULLS LAST, inout_indc COLLATE pg_catalog."default" ASC NULLS LAST, txn_ref_type COLLATE pg_catalog."default" ASC NULLS LAST, txn_ref_no COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_stockard88

-- DROP INDEX IF EXISTS public.idx_stockard88;

CREATE INDEX IF NOT EXISTS idx_stockard88
    ON public.item_stockard USING btree
    (location_id ASC NULLS LAST, item_id ASC NULLS LAST, ref_date ASC NULLS LAST, txn_ref_type COLLATE pg_catalog."default" ASC NULLS LAST, txn_ref_no COLLATE pg_catalog."default" ASC NULLS LAST, txn_date ASC NULLS LAST)
    TABLESPACE pg_default;

------------------------------------------------------------------------------
-- Table: public.item_group

-- DROP TABLE IF EXISTS public.item_group;

CREATE TABLE IF NOT EXISTS public.item_group
(
    item_grp_id integer NOT NULL,
    item_grp_desc character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_item_group PRIMARY KEY (item_grp_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_group
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.item_group TO PUBLIC;

GRANT ALL ON TABLE public.item_group TO postgres;

-------------------------------------------------------------------------------
-- Table: public.item_group_items

-- DROP TABLE IF EXISTS public.item_group_items;

CREATE TABLE IF NOT EXISTS public.item_group_items
(
    item_grp_id integer NOT NULL,
    item_id integer NOT NULL,
    CONSTRAINT pk_item_group_items PRIMARY KEY (item_grp_id, item_id),
    CONSTRAINT fk_item_group_items_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_item_group_items_item_group FOREIGN KEY (item_grp_id)
        REFERENCES public.item_group (item_grp_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_group_items
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item_group_items TO PUBLIC;

GRANT ALL ON TABLE public.item_group_items TO postgres;

-------------------------------------------------------------------
-- Table: public.item_set_menu

-- DROP TABLE IF EXISTS public.item_set_menu;

CREATE TABLE IF NOT EXISTS public.item_set_menu
(
    set_item_id integer NOT NULL,
    set_dtl_id integer NOT NULL,
    menu_item_grp_id integer,
    menu_item_id integer,
    qty integer,
    set_addon_price double precision,
    sort_order integer,
    CONSTRAINT pk_item_set_menu PRIMARY KEY (set_item_id, set_dtl_id),
    CONSTRAINT fk_item_set_menu FOREIGN KEY (set_item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_set_menu
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.item_set_menu TO PUBLIC;

GRANT ALL ON TABLE public.item_set_menu TO postgres;


----------------------------------------------------------------------------
-- Table: public.item_promo

-- DROP TABLE IF EXISTS public.item_promo;

CREATE TABLE IF NOT EXISTS public.item_promo
(
    promo_id integer NOT NULL,
    promo_desc character varying(255) COLLATE pg_catalog."default" NOT NULL,
    promo_start_dt date,
    promo_end_dt date,
    promo_start_time time without time zone,
    promo_end_time time without time zone,
    mon_active character(1) COLLATE pg_catalog."default",
    tue_active character(1) COLLATE pg_catalog."default",
    wed_active character(1) COLLATE pg_catalog."default",
    thu_active character(1) COLLATE pg_catalog."default",
    fri_active character(1) COLLATE pg_catalog."default",
    sat_active character(1) COLLATE pg_catalog."default",
    sun_active character(1) COLLATE pg_catalog."default",
    active_flag character(1) COLLATE pg_catalog."default",
    lastupduserid character varying(20) COLLATE pg_catalog."default",
    lastupddt timestamp without time zone,
    CONSTRAINT pk_item_promo PRIMARY KEY (promo_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_promo
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.item_promo TO PUBLIC;

GRANT ALL ON TABLE public.item_promo TO postgres;
-- Index: idx_item_promo_dates

-- DROP INDEX IF EXISTS public.idx_item_promo_dates;

CREATE INDEX IF NOT EXISTS idx_item_promo_dates
    ON public.item_promo USING btree
    (promo_start_dt ASC NULLS LAST, promo_end_dt ASC NULLS LAST, promo_start_time ASC NULLS LAST, promo_end_time ASC NULLS LAST, active_flag COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

----------------------------------------------------------
-- Table: public.item_promo_items

-- DROP TABLE IF EXISTS public.item_promo_items;

CREATE TABLE IF NOT EXISTS public.item_promo_items
(
    promo_id integer NOT NULL,
    item_id integer NOT NULL,
    promo_price double precision,
    promo_disc_pcnt double precision,
    CONSTRAINT pk_item_promo_items PRIMARY KEY (promo_id, item_id),
    CONSTRAINT fk_item_promo_items_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_item_promo_items_item_promo FOREIGN KEY (promo_id)
        REFERENCES public.item_promo (promo_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_promo_items
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item_promo_items TO PUBLIC;

GRANT ALL ON TABLE public.item_promo_items TO postgres;

--------------------------------------------------------------------
-- Table: public.food_delivery_app_item_price

-- DROP TABLE IF EXISTS public.food_delivery_app_item_price;

CREATE TABLE IF NOT EXISTS public.food_delivery_app_item_price
(
    app_id integer NOT NULL,
    item_id integer NOT NULL,
    app_add_pcnt double precision,
    app_add_amt double precision,
    app_price double precision,
    active_flag character(1) COLLATE pg_catalog."default",
    CONSTRAINT pk_food_delivery_app_item_price PRIMARY KEY (app_id, item_id),
    CONSTRAINT fk_food_dlvry_app_item_price_app FOREIGN KEY (app_id)
        REFERENCES public.food_delivery_app (app_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.food_delivery_app_item_price
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.food_delivery_app_item_price TO PUBLIC;

GRANT ALL ON TABLE public.food_delivery_app_item_price TO postgres;    

-------------------------------------------------
-- Table: public.price_list_history

-- DROP TABLE IF EXISTS public.price_list_history;

CREATE TABLE IF NOT EXISTS public.price_list_history
(
    history_id bigint NOT NULL,
    item_id integer NOT NULL,
    price double precision NOT NULL,
    lastupduserid character varying(20) COLLATE pg_catalog."default",
    lastupddt timestamp without time zone,
    CONSTRAINT pk_price_list_history PRIMARY KEY (history_id, item_id),
    CONSTRAINT fk_price_list_history_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.price_list_history
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.price_list_history TO PUBLIC;

GRANT ALL ON TABLE public.price_list_history TO postgres;

--------------------------------------------------------------
-- Table: public.branch_order_dtl

-- DROP TABLE IF EXISTS public.branch_order_dtl;

CREATE TABLE IF NOT EXISTS public.branch_order_dtl
(
    order_id bigint NOT NULL,
    order_dtl_id integer NOT NULL,
    item_id integer NOT NULL,
    qty integer NOT NULL,
    unit_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    takeout_flag character varying(1) COLLATE pg_catalog."default",
    txn_date timestamp without time zone,
    status_flag character varying(1) COLLATE pg_catalog."default",
    billed_flag character varying(1) COLLATE pg_catalog."default",
    return_flag character varying(1) COLLATE pg_catalog."default",
    updatedby character varying(20) COLLATE pg_catalog."default",
    price double precision,
    splitgroup character varying(1) COLLATE pg_catalog."default",
    weight double precision,
    name_ext character varying(100) COLLATE pg_catalog."default",
    remarks character varying(100) COLLATE pg_catalog."default",
    slip_no integer,
    orig_dtl_id integer,
    set_dtl_id integer,
    sc_indc character(1) COLLATE pg_catalog."default",
    cup_no integer,
    tot_cup integer,
    sc_flag character(1) COLLATE pg_catalog."default",
    svc_flag character(1) COLLATE pg_catalog."default",
    size_amt double precision,
    CONSTRAINT pk_branch_order_dtl PRIMARY KEY (order_id, order_dtl_id),
    CONSTRAINT fk_branch_order_dtl_branch_order FOREIGN KEY (order_id)
        REFERENCES public.branch_order (order_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_branch_order_dtl_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_branch_order_dtl_unit FOREIGN KEY (unit_code)
        REFERENCES public.unit (unit_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.branch_order_dtl
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.branch_order_dtl TO PUBLIC;

GRANT ALL ON TABLE public.branch_order_dtl TO postgres;
-- Index: idx_branch_order_dtl2

-- DROP INDEX IF EXISTS public.idx_branch_order_dtl2;

CREATE INDEX IF NOT EXISTS idx_branch_order_dtl2
    ON public.branch_order_dtl USING btree
    (order_id ASC NULLS LAST, order_dtl_id ASC NULLS LAST, item_id ASC NULLS LAST, takeout_flag COLLATE pg_catalog."default" ASC NULLS LAST, txn_date ASC NULLS LAST, status_flag COLLATE pg_catalog."default" ASC NULLS LAST, billed_flag COLLATE pg_catalog."default" ASC NULLS LAST, return_flag COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

------------------------------------------------------------    
-- Table: public.item_receipt_dtl

-- DROP TABLE IF EXISTS public.item_receipt_dtl;

CREATE TABLE IF NOT EXISTS public.item_receipt_dtl
(
    ir_id bigint NOT NULL,
    ir_dtl_id integer NOT NULL,
    item_id integer NOT NULL,
    unit_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    qty double precision NOT NULL,
    CONSTRAINT pk_item_receipt_dtl PRIMARY KEY (ir_id, ir_dtl_id),
    CONSTRAINT fk_item_receipt_dtl_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_item_receipt_dtl_item_receipt FOREIGN KEY (ir_id)
        REFERENCES public.item_receipt (ir_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_item_receipt_dtl_unit FOREIGN KEY (unit_code)
        REFERENCES public.unit (unit_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.item_receipt_dtl
    OWNER to postgres;

GRANT DELETE, INSERT, SELECT, UPDATE ON TABLE public.item_receipt_dtl TO PUBLIC;

GRANT ALL ON TABLE public.item_receipt_dtl TO postgres;
-- Index: idx_item_receipt_dtl

-- DROP INDEX IF EXISTS public.idx_item_receipt_dtl;

CREATE INDEX IF NOT EXISTS idx_item_receipt_dtl
    ON public.item_receipt_dtl USING btree
    (ir_id ASC NULLS LAST, ir_dtl_id ASC NULLS LAST, item_id ASC NULLS LAST)
    TABLESPACE pg_default;

-----------------------------------------------------------------------------

-- Table: public.branch_item

-- DROP TABLE IF EXISTS public.branch_item;

CREATE TABLE IF NOT EXISTS public.branch_item
(
    item_id integer NOT NULL,
    price double precision,
    addon_price double precision,
    printer_name character varying(255) COLLATE pg_catalog."default",
    driver_name character varying(255) COLLATE pg_catalog."default",
    port character varying(255) COLLATE pg_catalog."default",
    lastupduserid character varying(20) COLLATE pg_catalog."default",
    lastupddt timestamp without time zone,
    CONSTRAINT pk_branch_item PRIMARY KEY (item_id),
    CONSTRAINT fk_branch_item_item FOREIGN KEY (item_id)
        REFERENCES public.item (item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.branch_item
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.branch_item TO PUBLIC;

GRANT ALL ON TABLE public.branch_item TO postgres;