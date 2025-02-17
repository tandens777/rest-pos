CREATE OR REPLACE PROCEDURE public.insert_item_group(
    IN p_item_grp_desc character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
  max_no int;
BEGIN 
    SELECT COALESCE(MAX(item_grp_id),0) INTO max_no FROM item_group;

    max_no := max_no + 1;
    INSERT INTO item_group (item_grp_id,item_grp_desc) VALUES (max_no, p_item_grp_desc);

END; 
$BODY$; 
ALTER PROCEDURE public.insert_item_group(character varying)
    OWNER TO postgres; 