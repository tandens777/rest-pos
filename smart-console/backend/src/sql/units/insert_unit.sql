CREATE OR REPLACE PROCEDURE public.insert_unit(
    IN p_unit_code character varying,
	IN p_unit_desc character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  INSERT INTO unit (unit_code, unit_desc) VALUES (p_unit_code, p_unit_desc);
END;
$BODY$;
ALTER PROCEDURE public.insert_unit(character varying, character varying)
    OWNER TO postgres;
