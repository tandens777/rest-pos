CREATE OR REPLACE PROCEDURE public.delete_item_tag(
	IN p_item_tag_id int)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM item_tag
  WHERE item_tag_id = delete_item_tag.p_item_tag_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_item_tag(int)
    OWNER TO postgres;
