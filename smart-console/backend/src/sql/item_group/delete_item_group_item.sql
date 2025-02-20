CREATE OR REPLACE PROCEDURE public.delete_item_group_item(
	IN p_item_grp_id int,
	IN p_item_id int
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM item_group_items
  WHERE item_grp_id = delete_item_group_item.p_item_grp_id 
  and   item_id = delete_item_group_item.p_item_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_item_group_item(int, int)
    OWNER TO postgres;
