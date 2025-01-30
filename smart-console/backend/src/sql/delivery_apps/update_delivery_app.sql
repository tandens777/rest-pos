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
declare old_order_type char(1);
BEGIN
	select 	order_type into old_order_type from food_delivery_app where app_id = p_app_id;
	
    UPDATE  food_delivery_app 
    SET     app_nm = p_app_nm,
            order_type = p_order_type,
            active_flag = p_active_flag,
            table_count = p_table_count,
            pic_filename = p_pic_filename
    WHERE   app_id = p_app_id;

	update 	order_type
	set		order_type = p_order_type,
			order_type_desc = p_app_nm
	where	order_type = old_order_type;

    -- If no rows were updated, perform an INSERT
        IF NOT FOUND THEN
            INSERT INTO order_type (order_type, order_type_desc)
            VALUES (p_order_type, p_app_nm);
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            -- If the UPDATE fails (e.g., due to a constraint violation), perform an INSERT
            INSERT INTO order_type (order_type, order_type_desc)
            VALUES (p_order_type, p_app_nm);    
	
END;
$BODY$;
ALTER PROCEDURE public.update_delivery_app(int, character varying, character varying, character varying, int, character varying)
    OWNER TO postgres;

