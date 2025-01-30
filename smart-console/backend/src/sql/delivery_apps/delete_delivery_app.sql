DROP PROCEDURE if exists public.delete_delivery_app;

CREATE OR REPLACE PROCEDURE public.delete_delivery_app(
	IN p_app_id int)
LANGUAGE 'plpgsql'
AS $BODY$
declare old_order_type char(1);
BEGIN
	select 	order_type into old_order_type from food_delivery_app where app_id = p_app_id;
  delete from order_type where order_type = old_order_type;

  DELETE FROM food_delivery_app WHERE app_id = p_app_id;

END;
$BODY$;
ALTER PROCEDURE public.delete_delivery_app(int)
    OWNER TO postgres;

