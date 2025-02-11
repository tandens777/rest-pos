CREATE OR REPLACE PROCEDURE public.insert_surcharge_discount(
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
    IN p_pcnt_on_nv_flag character varying,
    IN p_sort_order int
)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
  max_no int;
BEGIN
  -- Get the maximum id from the surcharge_discount table
  SELECT COALESCE(MAX(disc_id), 0) INTO max_no FROM surcharge_discount;
  
  -- Increment the max_no to ensure a unique id
  max_no := max_no + 1;
  
  -- Insert the new record
  INSERT INTO surcharge_discount (
      disc_id, disc_desc, disc_type, parent_disc_id, is_category, percentage, 
      amt, picture_src, need_ref, short_nm, auto_flag, need_authorization, 
      check_senior, active_flag, sm_discount_type, pcnt_on_nv_flag, sort_order
  ) 
  VALUES (
      max_no, p_disc_desc, p_disc_type, p_parent_disc_id, p_is_category, p_percentage, 
      p_amt, p_picture_src, p_need_ref, p_short_nm, p_auto_flag, p_need_authorization, 
      p_check_senior, p_active_flag, p_sm_discount_type, p_pcnt_on_nv_flag, p_sort_order
  );
END;
$BODY$;
ALTER PROCEDURE public.insert_surcharge_discount(
    character varying, character varying, int, character varying, double precision, 
    double precision, character varying, character varying, character varying, 
    character varying, character varying, character varying, character varying, 
    int, character varying, int
) OWNER TO postgres;
