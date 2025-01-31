CREATE OR REPLACE PROCEDURE public.insert_employee(
    IN p_emp_no CHARACTER VARYING,
    IN p_last_nm CHARACTER VARYING,
    IN p_first_nm CHARACTER VARYING,
    IN p_gender CHARACTER VARYING,
    IN p_station_id INTEGER,
    IN p_tin_no CHARACTER VARYING,
    IN p_sss_no CHARACTER VARYING,
    IN p_bday DATE,
    IN p_phone_no CHARACTER VARYING,
    IN p_date_hired DATE,
    IN p_date_end DATE,
    IN p_remarks CHARACTER VARYING,
    IN p_face_id CHARACTER VARYING,
    IN p_public_key CHARACTER VARYING,
    IN p_console_flag CHARACTER VARYING,
    IN p_drawer_flag CHARACTER VARYING,
    IN p_active_flag CHARACTER VARYING,
    IN p_pic_filename CHARACTER VARYING,
    IN p_mon_start1 TIME, IN p_mon_end1 TIME, IN p_mon_start2 TIME, IN p_mon_end2 TIME, IN p_mon_start3 TIME, IN p_mon_end3 TIME,
    IN p_tue_start1 TIME, IN p_tue_end1 TIME, IN p_tue_start2 TIME, IN p_tue_end2 TIME, IN p_tue_start3 TIME, IN p_tue_end3 TIME,
    IN p_wed_start1 TIME, IN p_wed_end1 TIME, IN p_wed_start2 TIME, IN p_wed_end2 TIME, IN p_wed_start3 TIME, IN p_wed_end3 TIME,
    IN p_thu_start1 TIME, IN p_thu_end1 TIME, IN p_thu_start2 TIME, IN p_thu_end2 TIME, IN p_thu_start3 TIME, IN p_thu_end3 TIME,
    IN p_fri_start1 TIME, IN p_fri_end1 TIME, IN p_fri_start2 TIME, IN p_fri_end2 TIME, IN p_fri_start3 TIME, IN p_fri_end3 TIME,
    IN p_sat_start1 TIME, IN p_sat_end1 TIME, IN p_sat_start2 TIME, IN p_sat_end2 TIME, IN p_sat_start3 TIME, IN p_sat_end3 TIME,
    IN p_sun_start1 TIME, IN p_sun_end1 TIME, IN p_sun_start2 TIME, IN p_sun_end2 TIME, IN p_sun_start3 TIME, IN p_sun_end3 TIME
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO employees (
        emp_no, last_nm, first_nm, gender, station_id, tin_no, sss_no, bday, phone_no,
        date_hired, date_end, remarks, face_id, public_key, console_flag, drawer_flag, active_flag, pic_filename,
        mon_start1, mon_end1, mon_start2, mon_end2, mon_start3, mon_end3,
        tue_start1, tue_end1, tue_start2, tue_end2, tue_start3, tue_end3,
        wed_start1, wed_end1, wed_start2, wed_end2, wed_start3, wed_end3,
        thu_start1, thu_end1, thu_start2, thu_end2, thu_start3, thu_end3,
        fri_start1, fri_end1, fri_start2, fri_end2, fri_start3, fri_end3,
        sat_start1, sat_end1, sat_start2, sat_end2, sat_start3, sat_end3,
        sun_start1, sun_end1, sun_start2, sun_end2, sun_start3, sun_end3
    ) VALUES (
        p_emp_no, p_last_nm, p_first_nm, p_gender, p_station_id, p_tin_no, p_sss_no, p_bday, p_phone_no,
        p_date_hired, p_date_end, p_remarks, p_face_id, p_public_key, p_console_flag, p_drawer_flag, p_active_flag, p_pic_filename,
        p_mon_start1, p_mon_end1, p_mon_start2, p_mon_end2, p_mon_start3, p_mon_end3,
        p_tue_start1, p_tue_end1, p_tue_start2, p_tue_end2, p_tue_start3, p_tue_end3,
        p_wed_start1, p_wed_end1, p_wed_start2, p_wed_end2, p_wed_start3, p_wed_end3,
        p_thu_start1, p_thu_end1, p_thu_start2, p_thu_end2, p_thu_start3, p_thu_end3,
        p_fri_start1, p_fri_end1, p_fri_start2, p_fri_end2, p_fri_start3, p_fri_end3,
        p_sat_start1, p_sat_end1, p_sat_start2, p_sat_end2, p_sat_start3, p_sat_end3,
        p_sun_start1, p_sun_end1, p_sun_start2, p_sun_end2, p_sun_start3, p_sun_end3
    );
END;
$$;

ALTER PROCEDURE public.insert_employee(
    CHARACTER VARYING, CHARACTER VARYING, CHARACTER VARYING, CHARACTER VARYING, INTEGER, CHARACTER VARYING, CHARACTER VARYING, DATE, CHARACTER VARYING,
    DATE, DATE, CHARACTER VARYING, CHARACTER VARYING, CHARACTER VARYING, CHARACTER VARYING, CHARACTER VARYING, CHARACTER VARYING, CHARACTER VARYING,
    TIME, TIME, TIME, TIME, TIME, TIME,
    TIME, TIME, TIME, TIME, TIME, TIME,
    TIME, TIME, TIME, TIME, TIME, TIME,
    TIME, TIME, TIME, TIME, TIME, TIME,
    TIME, TIME, TIME, TIME, TIME, TIME,
    TIME, TIME, TIME, TIME, TIME, TIME,
    TIME, TIME, TIME, TIME, TIME, TIME
) OWNER TO postgres;
