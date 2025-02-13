CREATE OR REPLACE PROCEDURE public.insert_food_station(
    IN p_station_nm character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
  max_no int;
BEGIN 
    SELECT COALESCE(MAX(station_id),0) INTO max_no FROM food_station;

    max_no := max_no + 1;
    INSERT INTO food_station (station_id,station_nm) VALUES (max_no, p_station_nm);

END; 
$BODY$; 
ALTER PROCEDURE public.insert_food_station(character varying)
    OWNER TO postgres;