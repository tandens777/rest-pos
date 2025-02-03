-- Table: public.employees

 DROP TABLE IF EXISTS public.employees;

CREATE TABLE IF NOT EXISTS public.employees
(
    id bigint NOT NULL,
    emp_no character varying(255) COLLATE pg_catalog."default" not null,
    last_nm character varying(255) COLLATE pg_catalog."default" not null,
    first_nm character varying(255) COLLATE pg_catalog."default" not null,
    gender character varying(255) COLLATE pg_catalog."default" not null,
    station_id integer,
    tin_no character varying(255) COLLATE pg_catalog."default",
    sss_no character varying(255) COLLATE pg_catalog."default",
    bday date,
    phone_no character varying(255) COLLATE pg_catalog."default",
    date_hired date,
    date_end date,
    remarks character varying(255) COLLATE pg_catalog."default",
    face_id character varying(255) COLLATE pg_catalog."default",
    public_key character varying(255) COLLATE pg_catalog."default",
    console_flag character varying(255) COLLATE pg_catalog."default" DEFAULT 'N'::bpchar,
    drawer_flag character varying(255) COLLATE pg_catalog."default" DEFAULT 'N'::bpchar,
    active_flag character varying(255) COLLATE pg_catalog."default" DEFAULT 'Y'::bpchar,
    pic_filename character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    emp_type_id integer NOT NULL DEFAULT 1,
    emp_status_id integer NOT NULL DEFAULT 1,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role_id bigint NOT NULL,
    mon_restday character varying(255) COLLATE pg_catalog."default",
    mon_start1 time without time zone,
    mon_end1 time without time zone,
    mon_start2 time without time zone,
    mon_end2 time without time zone,
    mon_start3 time without time zone,
    mon_end3 time without time zone,
    tue_restday character varying(255) COLLATE pg_catalog."default",
    tue_start1 time without time zone,
    tue_end1 time without time zone,
    tue_start2 time without time zone,
    tue_end2 time without time zone,
    tue_start3 time without time zone,
    tue_end3 time without time zone,
    wed_restday character varying(255) COLLATE pg_catalog."default",
    wed_start1 time without time zone,
    wed_end1 time without time zone,
    wed_start2 time without time zone,
    wed_end2 time without time zone,
    wed_start3 time without time zone,
    wed_end3 time without time zone,
    thu_restday character varying(255) COLLATE pg_catalog."default",
    thu_start1 time without time zone,
    thu_end1 time without time zone,
    thu_start2 time without time zone,
    thu_end2 time without time zone,
    thu_start3 time without time zone,
    thu_end3 time without time zone,
    fri_restday character varying(255) COLLATE pg_catalog."default",
    fri_start1 time without time zone,
    fri_end1 time without time zone,
    fri_start2 time without time zone,
    fri_end2 time without time zone,
    fri_start3 time without time zone,
    fri_end3 time without time zone,
    sat_restday character varying(255) COLLATE pg_catalog."default",
    sat_start1 time without time zone,
    sat_end1 time without time zone,
    sat_start2 time without time zone,
    sat_end2 time without time zone,
    sat_start3 time without time zone,
    sat_end3 time without time zone,
    sun_restday character varying(255) COLLATE pg_catalog."default",
    sun_start1 time without time zone,
    sun_end1 time without time zone,
    sun_start2 time without time zone,
    sun_end2 time without time zone,
    sun_start3 time without time zone,
    sun_end3 time without time zone,
    CONSTRAINT employees_pkey PRIMARY KEY (id),
    CONSTRAINT fk_emp_user_id FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employees
    OWNER to postgres;


-- Add unique index for username
ALTER TABLE public.employees
ADD CONSTRAINT unique_username UNIQUE (username);

-- Add unique index for emp_no
ALTER TABLE public.employees
ADD CONSTRAINT unique_emp_no UNIQUE (emp_no);

-- Add unique index for first_nm and last_nm combined
ALTER TABLE public.employees
ADD CONSTRAINT unique_first_last_name UNIQUE (first_nm, last_nm);

-- Add unique index for password (not recommended for security reasons)
ALTER TABLE public.employees
ADD CONSTRAINT unique_password UNIQUE (password);
