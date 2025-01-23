CREATE OR REPLACE PROCEDURE public.update_unit(
	IN p_id bigint,
    IN p_unit_code character varying,
	IN p_unit_desc character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  UPDATE unit SET unit_code = p_unit_code, unit_desc = p_unit_desc WHERE id = p_id;
END;
$BODY$;
ALTER PROCEDURE public.update_unit(bigint, character varying, character varying)
    OWNER TO postgres;

