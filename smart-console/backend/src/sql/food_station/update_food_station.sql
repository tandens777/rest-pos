CREATE OR REPLACE PROCEDURE public.update_food_station(
    IN p_station_id int, IN p_station_nm character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
    UPDATE food_station 
    SET station_nm = update_food_station.p_station_nm  
    WHERE station_id = update_food_station.p_station_id; 
END;
$BODY$;
ALTER PROCEDURE public.update_food_station(int,character varying)
    OWNER TO postgres;