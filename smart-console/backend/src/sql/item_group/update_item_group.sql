CREATE OR REPLACE PROCEDURE public.update_item_group(
    IN p_item_grp_id int, IN p_item_grp_desc character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
    UPDATE item_group
    SET item_grp_desc = update_item_group.p_item_grp_desc  
    WHERE item_grp_id = update_item_group.p_item_grp_id; 
END;
$BODY$;
ALTER PROCEDURE public.update_item_group(int, character varying)
    OWNER TO postgres;