CREATE OR REPLACE PROCEDURE public.update_item_usage_setup(
    IN p_item_id int,
    IN p_rm_item_id int,
    IN p_used_qty double precision,
    IN p_unit_code character varying
)
LANGUAGE plpgsql
AS $$
DECLARE
    row_count INT;
BEGIN 
    -- Attempt to update the existing row
    UPDATE  item_usage_setup
    SET     used_qty = p_used_qty,
            unit_code = p_unit_code
    WHERE   item_id = p_item_id
    AND     rm_item_id = p_rm_item_id;

    -- Check if any rows were updated
    GET DIAGNOSTICS row_count = ROW_COUNT;

    -- If no rows were updated, insert a new row
    IF row_count = 0 THEN
        INSERT INTO item_usage_setup (item_id, rm_item_id, used_qty, unit_code)
        VALUES (p_item_id, p_rm_item_id, p_used_qty, p_unit_code);
    END IF;
END;
$$;
ALTER PROCEDURE public.update_item_usage_setup(int, int, double precision, character varying)
    OWNER TO postgres;
