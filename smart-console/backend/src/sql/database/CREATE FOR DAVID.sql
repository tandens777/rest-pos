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

REVOKE ALL ON TABLE public.storage_location FROM PUBLIC;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.storage_location TO PUBLIC;

GRANT ALL ON TABLE public.storage_location TO postgres;


---------------------------------------

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

REVOKE ALL ON TABLE public.item_group FROM PUBLIC;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.item_group TO PUBLIC;

GRANT ALL ON TABLE public.item_group TO postgres;

CREATE UNIQUE INDEX IF NOT EXISTS idx_item_group_item_grp_desc
    ON public.item_group USING btree
    (item_grp_desc COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE UNIQUE INDEX IF NOT EXISTS idx_item_tag_item_tag_desc
    ON public.item_tag USING btree
    (item_tag_desc COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
