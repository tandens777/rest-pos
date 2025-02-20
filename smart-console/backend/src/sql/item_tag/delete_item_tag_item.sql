CREATE OR REPLACE PROCEDURE public.delete_item_tag_item(
	IN p_item_tag_id int,
	IN p_item_id int
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM item_tag_items
  WHERE item_tag_id = delete_item_tag_item.p_item_tag_id 
  and   item_id = delete_item_tag_item.p_item_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_item_tag_item(int, int)
    OWNER TO postgres;
