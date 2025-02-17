CREATE OR REPLACE PROCEDURE public.delete_item_group(
	IN p_item_grp_id int)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  DELETE FROM item_group 
  WHERE item_grp_id = delete_item_group.p_item_grp_id;
END;
$BODY$;
ALTER PROCEDURE public.delete_item_group(int)
    OWNER TO postgres;
