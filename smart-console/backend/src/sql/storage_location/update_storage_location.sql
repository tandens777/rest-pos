CREATE OR REPLACE PROCEDURE public.update_storage_location(
    IN p_location_id int, IN p_location_nm character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
    UPDATE storage_location
    SET location_nm = update_storage_location.p_location_nm  
    WHERE location_id = update_storage_location.p_location_id; 
END;
$BODY$;
ALTER PROCEDURE public.update_storage_location(int, character varying)
    OWNER TO postgres;