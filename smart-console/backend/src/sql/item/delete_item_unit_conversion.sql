CREATE OR REPLACE PROCEDURE public.delete_item_unit_conversion(
	IN p_item_id int,
	IN p_unit_code character varying
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM item_unit_conversion
  WHERE item_id = delete_item_unit_conversion.p_item_id 
  and   unit_code = delete_item_unit_conversion.p_unit_code;
END;
$BODY$;
ALTER PROCEDURE public.delete_item_unit_conversion(int, character varying)
    OWNER TO postgres;
