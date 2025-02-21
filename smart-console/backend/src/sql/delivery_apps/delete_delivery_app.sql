--DROP PROCEDURE if exists public.delete_delivery_app_item_price;

CREATE OR REPLACE PROCEDURE public.delete_delivery_app_item_price(
	IN p_app_id int, 
  IN p_item_id int
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM food_delivery_app_item_price 
  WHERE app_id = p_app_id
  AND   item_id = p_item_id;

END;
$BODY$;
ALTER PROCEDURE public.delete_delivery_app_item_price(int, int)
    OWNER TO postgres;

