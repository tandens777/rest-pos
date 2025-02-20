CREATE OR REPLACE PROCEDURE public.update_item_set_menu(
    IN p_set_item_id int,
    IN p_set_dtl_id int,
    IN p_menu_item_grp_id int,
    IN p_menu_item_id int,
    IN p_qty double precision,
    IN p_set_addon_price double precision,
    IN p_sort_order int
)
LANGUAGE plpgsql
AS $$
DECLARE
    row_count INT;
    new_dtl_id INT;
BEGIN 
    -- Attempt to update the existing row
    UPDATE item_set_menu
    SET menu_item_grp_id = p_menu_item_grp_id,
        menu_item_id = p_menu_item_id,
        qty = p_qty,
        set_addon_price = p_set_addon_price,
        sort_order = p_sort_order
    WHERE set_item_id = p_set_item_id
    AND set_dtl_id = p_set_dtl_id;

    -- Check if any rows were updated
    GET DIAGNOSTICS row_count = ROW_COUNT;

    -- If no rows were updated, insert a new row
    IF row_count = 0 THEN
        -- Get the next available set_dtl_id
        SELECT COALESCE(MAX(set_dtl_id), 0) + 1 INTO new_dtl_id 
        FROM public.item_set_menu 
        WHERE set_item_id = p_set_item_id;

        -- Insert a new row with the calculated set_dtl_id
        INSERT INTO item_set_menu (set_item_id, set_dtl_id, menu_item_grp_id, menu_item_id, qty, set_addon_price, sort_order)
        VALUES (p_set_item_id, new_dtl_id, p_menu_item_grp_id, p_menu_item_id, p_qty, p_set_addon_price, p_sort_order);
    END IF;
END;
$$;
ALTER PROCEDURE public.update_item_set_menu(int, int, int, int, double precision, double precision, int)
    OWNER TO postgres;
