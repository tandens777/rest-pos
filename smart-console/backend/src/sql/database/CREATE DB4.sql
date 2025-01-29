-- Table: public.food_delivery_app_item_price

 DROP TABLE IF EXISTS public.food_delivery_app_item_price;

-- Table: public.food_delivery_app

DROP TABLE IF EXISTS public.food_delivery_app;

CREATE TABLE IF NOT EXISTS public.food_delivery_app
(
    app_id integer NOT NULL,
    app_nm character varying(100) COLLATE pg_catalog."default" NOT NULL,
    order_type character(1) COLLATE pg_catalog."default" NOT NULL,
    active_flag character(1) COLLATE pg_catalog."default" NOT NULL,
    table_count integer NOT NULL DEFAULT 0,
    pic_filename character(1) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_food_delivery_app PRIMARY KEY (app_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.food_delivery_app
    OWNER to postgres;

REVOKE ALL ON TABLE public.food_delivery_app FROM PUBLIC;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.food_delivery_app TO PUBLIC;

GRANT ALL ON TABLE public.food_delivery_app TO postgres;


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

REVOKE ALL ON TABLE public.food_delivery_app_item_price FROM PUBLIC;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.food_delivery_app_item_price TO PUBLIC;

GRANT ALL ON TABLE public.food_delivery_app_item_price TO postgres;