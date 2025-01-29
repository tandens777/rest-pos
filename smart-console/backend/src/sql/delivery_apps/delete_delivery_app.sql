DROP PROCEDURE if exists public.delete_delivery_app;

CREATE OR REPLACE PROCEDURE public.delete_delivery_app(
	IN p_app_id int)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM food_delivery_app WHERE app_id = p_app_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_delivery_app(int)
    OWNER TO postgres;

