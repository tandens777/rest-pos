CREATE OR REPLACE PROCEDURE public.delete_item_group_items(
	IN p_item_grp_id int
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM item_group_items
  WHERE item_grp_id = delete_item_group_items.p_item_grp_id; 
END;
$BODY$;
ALTER PROCEDURE public.delete_item_group_items(int)
    OWNER TO postgres;
