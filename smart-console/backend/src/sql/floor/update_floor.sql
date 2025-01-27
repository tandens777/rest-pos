CREATE OR REPLACE PROCEDURE public.update_floor(
	IN p_id int,
    IN p_name character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  UPDATE floor SET name = p_name WHERE id = p_id;
END;
$BODY$;
ALTER PROCEDURE public.update_floor(int, character varying)
    OWNER TO postgres;

