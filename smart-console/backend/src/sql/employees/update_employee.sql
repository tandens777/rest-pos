-- PROCEDURE: public.update_employee(bigint, character varying)

-- DROP PROCEDURE IF EXISTS public.update_employee(bigint, character varying);

CREATE OR REPLACE PROCEDURE public.update_employee(
	IN p_id bigint,
	IN p_name character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  UPDATE employees SET name = p_name WHERE id = p_id;
END;
$BODY$;
ALTER PROCEDURE public.update_employee(bigint, character varying)
    OWNER TO postgres;

