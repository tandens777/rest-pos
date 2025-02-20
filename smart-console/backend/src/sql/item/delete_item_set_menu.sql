CREATE OR REPLACE PROCEDURE public.delete_item_set_menu(
	IN p_set_item_id int,
	IN p_set_dtl_id int
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM item_set_menu
  WHERE set_item_id = delete_item_set_menu.p_set_item_id 
  and   set_dtl_id = delete_item_set_menu.p_set_dtl_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_item_set_menu(int, int)
    OWNER TO postgres;
