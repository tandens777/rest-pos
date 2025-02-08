 DROP TABLE IF EXISTS public.employee_type;
CREATE TABLE IF NOT EXISTS public.employee_type
(
    emp_type_id int NOT NULL,
    emp_type_desc character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_emp_type PRIMARY KEY (emp_type_id) 
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employee_type
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.employee_type TO PUBLIC;
GRANT ALL ON TABLE public.employee_type TO postgres;

INSERT INTO employee_type VALUES (1, 'Daily');
INSERT INTO employee_type VALUES (2, 'Monthly');


 DROP TABLE IF EXISTS public.employee_status;
CREATE TABLE IF NOT EXISTS public.employee_status
(
    emp_status_id int NOT NULL,
    emp_status_desc character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_employee_status PRIMARY KEY (emp_status_id) 
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employee_status
    OWNER to postgres;

GRANT DELETE, UPDATE, INSERT, SELECT ON TABLE public.employee_status TO PUBLIC; -- Only if needed
GRANT ALL ON TABLE public.employee_status TO postgres;

INSERT INTO employee_status VALUES (1, 'Probationary');
INSERT INTO employee_status VALUES (2, 'Regular');
INSERT INTO employee_status VALUES (3, 'Contractual');
INSERT INTO employee_status VALUES (4, 'Casual');
INSERT INTO employee_status VALUES (5, 'Part-Time');
INSERT INTO employee_status VALUES (6, 'Trainee');
INSERT INTO employee_status VALUES (10, 'Resigned');
INSERT INTO employee_status VALUES (11, 'Terminated');
INSERT INTO employee_status VALUES (12, 'Suspended');
INSERT INTO employee_status VALUES (13, 'End Contract');


ALTER TABLE employees
ADD COLUMN facial_features character varying,
DROP COLUMN face_id;

ALTER TABLE users
ADD COLUMN facial_features character varying;

ALTER TABLE employees
ALTER COLUMN facial_features TYPE TEXT;


ALTER TABLE users
ALTER COLUMN facial_features TYPE TEXT;


alter table food_delivery_app
add column app_add_pcnt double precision;

alter table food_delivery_app
add column app_add_amt double precision;

