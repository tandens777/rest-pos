-- PROCEDURE: public.get_employee(bigint)

-- DROP PROCEDURE IF EXISTS public.get_employee(bigint);

CREATE OR REPLACE PROCEDURE public.get_employee(
	IN p_id bigint,
	OUT p_name character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  SELECT name INTO p_name FROM employees WHERE id = p_id;
END;
$BODY$;
ALTER PROCEDURE public.get_employee(bigint)
    OWNER TO postgres;

GRANT EXECUTE ON PROCEDURE public.get_employee(bigint) TO PUBLIC;

GRANT EXECUTE ON PROCEDURE public.get_employee(bigint) TO postgres;

