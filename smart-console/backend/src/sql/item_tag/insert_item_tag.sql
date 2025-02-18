CREATE OR REPLACE PROCEDURE public.insert_item_tag(
    IN p_item_tag_desc character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
  max_no int;
BEGIN 
    SELECT COALESCE(MAX(item_tag_id),0) INTO max_no FROM item_tag;

    max_no := max_no + 1;
    INSERT INTO item_tag (item_tag_id,item_tag_desc) VALUES (max_no, p_item_tag_desc);

END; 
$BODY$; 
ALTER PROCEDURE public.insert_item_tag(character varying)
    OWNER TO postgres; 