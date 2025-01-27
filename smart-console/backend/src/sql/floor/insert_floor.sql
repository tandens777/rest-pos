CREATE OR REPLACE PROCEDURE public.insert_floor(
    IN p_name character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  INSERT INTO floor (name) VALUES (p_name);
END;
$BODY$;
ALTER PROCEDURE public.insert_floor(character varying)
    OWNER TO postgres;
