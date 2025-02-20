CREATE OR REPLACE PROCEDURE public.update_item_tag_items(
    IN p_item_tag_id int,
    IN p_item_id int
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the row exists, if not insert a new one
    IF NOT EXISTS (
        SELECT 1 FROM item_tag_items 
        WHERE item_tag_id = p_item_tag_id AND item_id = p_item_id
    ) THEN
        INSERT INTO item_tag_items (item_tag_id, item_id)
        VALUES (p_item_tag_id, p_item_id);
    END IF;
END;
$$;
ALTER PROCEDURE public.update_item_tag_items(int, int)
    OWNER TO postgres;
