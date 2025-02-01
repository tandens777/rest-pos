-- PROCEDURE: public.delete_employee(bigint)

-- DROP PROCEDURE IF EXISTS public.delete_employee(bigint);

CREATE OR REPLACE PROCEDURE public.delete_employee(
	IN p_id bigint)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM employees WHERE id = p_id;
  DELETE FROM users where id = p_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_employee(bigint)
    OWNER TO postgres;

