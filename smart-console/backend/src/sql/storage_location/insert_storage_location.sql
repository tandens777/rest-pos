CREATE OR REPLACE PROCEDURE public.insert_storage_location(
    IN p_location_nm character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
  max_no int;
BEGIN 
    SELECT COALESCE(MAX(location_id),0) INTO max_no FROM storage_location;

    max_no := max_no + 1;
    INSERT INTO storage_location (location_id,location_nm) VALUES (max_no, p_location_nm);

END; 
$BODY$; 
ALTER PROCEDURE public.insert_storage_location(character varying)
    OWNER TO postgres;