CREATE OR REPLACE PROCEDURE public.insert_pay_method(
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
DECLARE
  max_no int;
BEGIN
  -- Get the maximum id from the pay_method table
  SELECT COALESCE(MAX(pay_mtd_id), 0) INTO max_no FROM pay_method;
  
  -- Increment the max_no to ensure a unique id
  max_no := max_no + 1;
  
  -- Insert the new record
  INSERT INTO pay_method (
      pay_mtd_id, pay_mtd_desc, parent_pay_mtd_id, is_category, picture_src, 
      need_ref, need_expdt, short_nm, active_flag, bank_charges, sm_pay_type, sort_order
  ) 
  VALUES (
      max_no, p_pay_mtd_desc, p_parent_pay_mtd_id, p_is_category, p_picture_src, 
      p_need_ref, p_need_expdt, p_short_nm, p_active_flag, p_bank_charges, p_sm_pay_type, p_sort_order
  );
END;
$BODY$;
ALTER PROCEDURE public.insert_pay_method(
    character varying, int, character varying, character varying, character varying, 
    character varying, character varying, character varying, double precision, int, int
) OWNER TO postgres;
