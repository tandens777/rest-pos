DROP PROCEDURE IF EXISTS public.update_company;

CREATE OR REPLACE PROCEDURE public.update_company(
	IN p_id int,
  IN p_cmpy_nm character varying, 
  IN p_operated_by character varying, 
  IN p_tin_no character varying, 
  IN p_address1 character varying,  
  IN p_address2 character varying,  
  IN p_roller_txt character varying, 
  IN p_branch_manager character varying, 
  IN p_branch_tel_no character varying, 
  IN p_email character varying, 
  IN p_logo_filename character varying, 
  IN p_dinein_count int default 0,
  IN p_pickup_count int default 0,
  IN p_dlvry_count int default 0,
  IN p_send_to_kitchen character varying default 'Y', 
  IN p_track_invty_flag character varying default 'Y')
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
  UPDATE company_branch 
  SET cmpy_nm = p_cmpy_nm, 
      operated_by = p_operated_by, 
      tin_no = p_tin_no, 
      address1 = p_address1,  
      address2 = p_address2, 
      roller_txt = p_roller_txt, 
      branch_manager = p_branch_manager, 
      branch_tel_no = p_branch_tel_no, 
      email = p_email, 
      logo_filename = NULLIF(p_logo_filename, ''), 
      dinein_count = p_dinein_count,
      pickup_count = p_pickup_count,
      dlvry_count = p_dlvry_count,
      send_to_kitchen = p_send_to_kitchen, 
      track_invty_flag = p_track_invty_flag
  WHERE id = p_id;
END;
$BODY$;
ALTER PROCEDURE public.update_company(int, 
character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, 
int, int, int, character varying, character varying)
    OWNER TO postgres;
