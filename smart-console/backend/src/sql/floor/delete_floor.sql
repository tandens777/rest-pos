CREATE OR REPLACE PROCEDURE public.delete_floor(
	IN p_id int)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM floor WHERE id = p_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_floor(int)
    OWNER TO postgres;

