CREATE OR REPLACE PROCEDURE public.delete_unit(
	IN p_id bigint)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM unit WHERE id = p_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_unit(bigint)
    OWNER TO postgres;

