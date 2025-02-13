CREATE OR REPLACE PROCEDURE public.delete_food_station(
	IN p_station_id int)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM food_station 
  WHERE station_id = delete_food_station.p_station_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_food_station(int)
    OWNER TO postgres;
