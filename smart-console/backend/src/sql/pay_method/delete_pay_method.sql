DROP PROCEDURE IF EXISTS public.delete_pay_method;

CREATE OR REPLACE PROCEDURE public.delete_pay_method(
    IN p_pay_mtd_id int
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    -- Delete the pay method record
    DELETE FROM pay_method WHERE pay_mtd_id = p_pay_mtd_id;

    -- If no rows were deleted, raise an exception
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No pay method found with id %', p_pay_mtd_id;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error deleting pay method: %', SQLERRM;
END;
$BODY$;

ALTER PROCEDURE public.delete_pay_method(int) OWNER TO postgres;
