CREATE OR REPLACE PROCEDURE public.update_item_group_items(
    IN p_item_grp_id int,
    IN p_item_id int,
    IN p_addon_price double precision
)
LANGUAGE plpgsql
AS $$
DECLARE
    row_count INT;
BEGIN
    -- Attempt to update the row
    UPDATE item_group_items
    SET addon_price = p_addon_price
    WHERE item_grp_id = p_item_grp_id
    AND item_id = p_item_id;

    -- Check how many rows were affected
    GET DIAGNOSTICS row_count = ROW_COUNT;

    -- If no rows were updated, perform an INSERT
    IF row_count = 0 THEN
        INSERT INTO item_group_items (item_grp_id, item_id, addon_price)
        VALUES (p_item_grp_id, p_item_id, p_addon_price);
    END IF;
END;
$$;
ALTER PROCEDURE public.update_item_group_items(int, int, double precision)
    OWNER TO postgres;
