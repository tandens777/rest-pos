--DROP PROCEDURE IF EXISTS public.update_surcharge_discount;

CREATE OR REPLACE PROCEDURE public.update_surcharge_discount(
    IN p_disc_id int,
    IN p_disc_desc character varying,
    IN p_disc_type character varying,
    IN p_parent_disc_id int,
    IN p_is_category character varying,
    IN p_percentage double precision,
    IN p_amt double precision,
    IN p_picture_src character varying,
    IN p_need_ref character varying,
    IN p_short_nm character varying,
    IN p_auto_flag character varying,
    IN p_need_authorization character varying,
    IN p_check_senior character varying,
    IN p_active_flag character varying,
    IN p_sm_discount_type int,
    IN p_pcnt_on_nv_flag character varying
)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    -- Update the surcharge_discount table
    UPDATE surcharge_discount 
    SET 
        disc_desc = p_disc_desc,
        disc_type = p_disc_type,
        parent_disc_id = p_parent_disc_id,
        is_category = p_is_category,
        percentage = p_percentage,
        amt = p_amt,
        picture_src = p_picture_src,
        need_ref = p_need_ref,
        short_nm = p_short_nm,
        auto_flag = p_auto_flag,
        need_authorization = p_need_authorization,
        check_senior = p_check_senior,
        active_flag = p_active_flag,
        sm_discount_type = p_sm_discount_type,
        pcnt_on_nv_flag = p_pcnt_on_nv_flag
    WHERE disc_id = p_disc_id;

    -- If no rows were updated, raise an exception
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No surcharge discount found with id %', p_disc_id;
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error updating surcharge discount: %', SQLERRM;
END;
$BODY$;

ALTER PROCEDURE public.update_surcharge_discount(
    int, character varying, character varying, int, character varying, double precision, 
    double precision, character varying, character varying, character varying, 
    character varying, character varying, character varying, character varying, 
    int, character varying
) OWNER TO postgres;
