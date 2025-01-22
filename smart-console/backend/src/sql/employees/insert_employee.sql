-- PROCEDURE: public.insert_employee(character varying)

-- DROP PROCEDURE IF EXISTS public.insert_employee(character varying);

CREATE OR REPLACE PROCEDURE public.insert_employee(
	IN p_name character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  INSERT INTO employees (name) VALUES (p_name);
END;
$BODY$;
ALTER PROCEDURE public.insert_employee(character varying)
    OWNER TO postgres;
