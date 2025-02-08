CREATE OR REPLACE PROCEDURE public.insert_delivery_app(
    IN p_app_nm character varying,
    IN p_order_type character varying,
    IN p_active_flag character varying,
    IN p_table_count int,
    IN p_pic_filename character varying,
    IN p_app_add_pcnt double precision,
    IN p_app_add_amt double precision)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
  max_no int;
BEGIN
  -- Get the maximum id from the floor table
  SELECT COALESCE(MAX(app_id), 0) INTO max_no FROM food_delivery_app;
  
  -- Increment the max_no to ensure a unique id
  max_no := max_no + 1;
  
  -- Insert the new record
  INSERT INTO food_delivery_app (app_id, app_nm, order_type, active_flag, table_count, pic_filename, app_add_pcnt, app_add_amt) 
  VALUES (max_no, p_app_nm, p_order_type, p_active_flag, p_table_count, p_pic_filename, p_app_add_pcnt, p_app_add_amt);

  insert into order_type (order_type, order_type_desc) values (p_order_type, p_app_nm);
END;
$BODY$;
ALTER PROCEDURE public.insert_delivery_app(character varying, character varying, character varying, int, character varying, double precision, double precision)
    OWNER TO postgres;
