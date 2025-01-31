--- Table: public.users

 DROP TABLE IF EXISTS public.employees;

CREATE TABLE IF NOT EXISTS public.employees
(
    id bigint NOT NULL,
	emp_no character varying(20),
	last_nm character varying(255),
	first_nm character varying(255),
	gender char(1),
	station_id int,
	tin_no character varying(20), 
	sss_no character varying(20),
	bday date,
	phone_no character varying(50),
	date_hired date,
	date_end date,
	remarks character varying(255),
	face_id character varying(255),
	public_key character varying(255),
	console_flag char(1) default 'N',
	drawer_flag char(1) default 'N',
	active_flag char(1) default 'Y',
	pic_filename character varying(255),
	address character varying(255),
	email character varying(50),

	emp_type_id int not null default 1,
	emp_status_id int not null default 1,
	
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role_id bigint NOT NULL,
	
	mon_restday char(1), mon_start1 time, mon_end1 time, mon_start2 time, mon_end2 time, mon_start3 time, mon_end3 time,
	tue_restday char(1), tue_start1 time, tue_end1 time, tue_start2 time, tue_end2 time, tue_start3 time, tue_end3 time,
	wed_restday char(1), wed_start1 time, wed_end1 time, wed_start2 time, wed_end2 time, wed_start3 time, wed_end3 time,
	thu_restday char(1), thu_start1 time, thu_end1 time, thu_start2 time, thu_end2 time, thu_start3 time, thu_end3 time,
	fri_restday char(1), fri_start1 time, fri_end1 time, fri_start2 time, fri_end2 time, fri_start3 time, fri_end3 time,
	sat_restday char(1), sat_start1 time, sat_end1 time, sat_start2 time, sat_end2 time, sat_start3 time, sat_end3 time,
	sun_restday char(1), sun_start1 time, sun_end1 time, sun_start2 time, sun_end2 time, sun_start3 time, sun_end3 time,
	
    CONSTRAINT employees_pkey PRIMARY KEY (id),
    CONSTRAINT fk_emp_user_id FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employees
    OWNER to postgres;