CREATE OR REPLACE PROCEDURE public.update_order_type_alias(
	IN p_order_type character(1),
    IN p_tbl_num int,
	IN p_tbl_name character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  UPDATE order_type_aliases SET tbl_name = p_tbl_name WHERE order_type = p_order_type and tbl_num = p_tbl_num;
END;
$BODY$;
ALTER PROCEDURE public.update_order_type_alias(character(1), int, character varying)
    OWNER TO postgres;

