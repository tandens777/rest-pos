DROP PROCEDURE IF EXISTS public.delete_surcharge_discount;

CREATE OR REPLACE PROCEDURE public.delete_surcharge_discount(
    IN p_disc_id int
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    -- Delete the surcharge discount record
    DELETE FROM surcharge_discount WHERE disc_id = p_disc_id;

    -- If no rows were deleted, raise an exception
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No surcharge discount found with id %', p_disc_id;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error deleting surcharge discount: %', SQLERRM;
END;
$BODY$;

ALTER PROCEDURE public.delete_surcharge_discount(int) OWNER TO postgres;
