CREATE OR REPLACE PROCEDURE public.update_item_tag(
    IN p_item_tag_id int, IN p_item_tag_desc character varying)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
    UPDATE item_tag
    SET item_tag_desc = update_item_tag.p_item_tag_desc  
    WHERE item_tag_id = update_item_tag.p_item_tag_id; 
END;
$BODY$;
ALTER PROCEDURE public.update_item_tag(int, character varying)
    OWNER TO postgres;