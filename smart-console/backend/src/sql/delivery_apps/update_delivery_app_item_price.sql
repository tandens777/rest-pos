--DROP PROCEDURE if exists public.update_delivery_app_item_price;

CREATE OR REPLACE PROCEDURE public.update_delivery_app_item_price(
	IN p_app_id int,
	IN p_item_id int,
    IN p_app_add_pcnt double precision,
    IN p_app_add_amt double precision,
    IN p_app_price double precision,
    IN p_active_flag character varying
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    UPDATE  food_delivery_app_item_price 
    SET     app_add_pcnt = p_app_add_pcnt,
            app_add_amt = p_app_add_amt,
            app_price = p_app_price,
            active_flag = p_active_flag
    WHERE   app_id = p_app_id
    AND     item_id = p_item_id;

END;
$BODY$;
ALTER PROCEDURE public.update_delivery_app_item_price(int, int, double precision, double precision, double precision, character varying)
    OWNER TO postgres;

