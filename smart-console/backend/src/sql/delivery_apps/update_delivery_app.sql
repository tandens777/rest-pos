DROP PROCEDURE if exists public.update_delivery_app;

CREATE OR REPLACE PROCEDURE public.update_delivery_app(
	IN p_app_id int,
    IN p_app_nm character varying,
    IN p_order_type character varying,
    IN p_active_flag character varying,
    IN p_table_count int,
    IN p_pic_filename character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    UPDATE  food_delivery_app 
    SET     app_nm = p_app_nm,
            order_type = p_order_type,
            active_flag = p_active_flag,
            table_count = p_table_count,
            pic_filename = p_pic_filename
    WHERE   app_id = p_app_id;
END;
$BODY$;
ALTER PROCEDURE public.update_delivery_app(int, character varying, character varying, character varying, int, character varying)
    OWNER TO postgres;

