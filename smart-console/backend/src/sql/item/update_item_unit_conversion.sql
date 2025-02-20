CREATE OR REPLACE PROCEDURE public.update_item_unit_conversion(
    IN p_item_id int,
    IN p_unit_code character varying,
    IN p_conversion_to_default double precision
)
LANGUAGE plpgsql
AS $$
DECLARE
    row_count INT;
BEGIN 
    -- Attempt to update the existing row
    UPDATE  item_unit_conversion
    SET     conversion_to_default = p_conversion_to_default
    WHERE   item_id = p_item_id
    AND     unit_code = p_unit_code;

    -- Check if any rows were updated
    GET DIAGNOSTICS row_count = ROW_COUNT;

    -- If no rows were updated, insert a new row
    IF row_count = 0 THEN
        INSERT INTO item_unit_conversion (item_id, unit_code, conversion_to_default)
        VALUES (p_item_id, p_unit_code, p_conversion_to_default);
    END IF;
END;
$$;
ALTER PROCEDURE public.update_item_unit_conversion(int, character varying, double precision)
    OWNER TO postgres;
