CREATE OR REPLACE PROCEDURE public.delete_storage_location(
    IN p_location_id int)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
    DELETE FROM storage_location
    WHERE location_id = delete_storage_location.p_location_id; 
END;
$BODY$;
ALTER PROCEDURE public.delete_storage_location(int)
    OWNER TO postgres;