CREATE OR REPLACE PROCEDURE public.delete_item(
	IN p_item_id int)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM item
  WHERE item_id = delete_item.p_item_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_item(int)
    OWNER TO postgres;
