CREATE OR REPLACE PROCEDURE public.update_order_type_alias(
	IN p_order_type character(1),
    IN p_tbl_num int,
	IN p_tbl_name character varying,
  IN p_floor_id int,
  IN p_picture character varying,
  IN p_position_x int,
  IN p_position_y int)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  UPDATE  order_type_aliases 
  SET     tbl_name = p_tbl_name,
          floor_id = p_floor_id,
          picture = p_picture,
          position_x = p_position_x,
          position_y = p_position_y
  WHERE   order_type = p_order_type and tbl_num = p_tbl_num;
END;
$BODY$;
ALTER PROCEDURE public.update_order_type_alias(character(1), int, character varying, int, character varying, int, int)
    OWNER TO postgres;

