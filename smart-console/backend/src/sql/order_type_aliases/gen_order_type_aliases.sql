DROP PROCEDURE IF EXISTS public.gen_order_type_aliases;

CREATE OR REPLACE PROCEDURE public.gen_order_type_aliases(
    IN p_order_type CHAR(1),
    IN p_skip_nums VARCHAR,
    IN p_start_num INT
)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    max_cnt INT;
    curr_id INT := 0;
    tbl_name_counter INT;
    skip_nums INT[]; -- Array to store numbers to skip
    num_to_skip INT;
BEGIN
    -- Determine the maximum count based on the order type
    IF p_order_type = 'N' THEN
        SELECT dinein_count INTO max_cnt FROM company_branch WHERE id = 1;
    ELSIF p_order_type = 'P' THEN
        SELECT pickup_count INTO max_cnt FROM company_branch WHERE id = 1;
    ELSIF p_order_type = 'D' THEN
        SELECT dlvry_count INTO max_cnt FROM company_branch WHERE id = 1;
    ELSE
        SELECT table_count INTO max_cnt FROM food_delivery_app WHERE order_type = p_order_type;
    END IF;

    -- Clean old table count for the given order type
    DELETE FROM order_type_aliases WHERE order_type = p_order_type;

    -- Parse p_skip_nums into an array of integers
    IF p_skip_nums IS NOT NULL AND p_skip_nums <> '' THEN
        skip_nums := ARRAY(SELECT TRIM(UNNEST(STRING_TO_ARRAY(p_skip_nums, ',')))::INT);
    ELSE
        skip_nums := ARRAY[]::INT[]; -- Empty array if no numbers to skip
    END IF;

    -- Initialize tbl_name_counter with p_start_num
    tbl_name_counter := p_start_num - 1; -- Subtract 1 to account for the first increment in the loop

    -- Loop to insert records into order_type_aliases
    WHILE curr_id < max_cnt LOOP
        curr_id := curr_id + 1;

        -- Increment tbl_name_counter until it finds a number not in skip_nums
        LOOP
            tbl_name_counter := tbl_name_counter + 1;
            EXIT WHEN NOT (tbl_name_counter = ANY(skip_nums)); -- Exit if not in skip_nums
        END LOOP;

        -- Insert the record
        INSERT INTO order_type_aliases
        (order_type, tbl_num, tbl_name)
        VALUES
        (p_order_type, curr_id, tbl_name_counter::VARCHAR);
    END LOOP;
END;
$BODY$;

ALTER PROCEDURE public.gen_order_type_aliases(CHAR(1), VARCHAR, INT)
    OWNER TO postgres;