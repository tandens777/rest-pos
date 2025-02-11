--DROP PROCEDURE IF EXISTS public.update_pay_method;

CREATE OR REPLACE PROCEDURE public.update_pay_method(
    IN p_pay_mtd_id int,
    IN p_pay_mtd_desc character varying,
    IN p_parent_pay_mtd_id int,
    IN p_is_category character varying,
    IN p_picture_src character varying,
    IN p_need_ref character varying,
    IN p_need_expdt character varying,
    IN p_short_nm character varying,
    IN p_active_flag character varying,
    IN p_bank_charges double precision,
    IN p_sm_pay_type int,
    IN p_sort_order int
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    -- Update the pay_method table
    UPDATE pay_method 
    SET 
        pay_mtd_desc = p_pay_mtd_desc,
        parent_pay_mtd_id = p_parent_pay_mtd_id,
        is_category = p_is_category,
        picture_src = p_picture_src,
        need_ref = p_need_ref,
        need_expdt = p_need_expdt,
        short_nm = p_short_nm,
        active_flag = p_active_flag,
        bank_charges = p_bank_charges,
        sm_pay_type = p_sm_pay_type,
        sort_order = p_sort_order
    WHERE pay_mtd_id = p_pay_mtd_id;

    -- If no rows were updated, raise an exception
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No pay method found with id %', p_pay_mtd_id;
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error updating pay method: %', SQLERRM;
END;
$BODY$;

ALTER PROCEDURE public.update_pay_method(
    int, character varying, int, character varying, character varying, 
    character varying, character varying, character varying, character varying, double precision, int, int
) OWNER TO postgres;
